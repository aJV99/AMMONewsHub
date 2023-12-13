import json
from django.http import HttpResponse, HttpRequest, JsonResponse, HttpResponseNotAllowed
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt


from .models import User, Profile, Article, Comment
from .forms import CustomUserCreationForm, CustomUserLoginForm


def main_spa(request: HttpRequest) -> HttpResponse:
    return render(request, "api/spa/index.html", {})


# LOGIN VIEW
# def loginUser(request):
#     page='login'
#     if request.user.is_authenticated:
#         return redirect('api:main')

#     if request.method == 'POST':
#         username = request.POST['username']
#         password = request.POST['password']

#         try:
#             #Check that this user exists
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'Username does not exist')

#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user) #Create the session for the user in the db and in browser's cookies
#             return redirect('api:main')
#         else:
#             messages.error(request, 'Username OR Password does not exist')

#     return render(request, 'api/spa/login_register.html')


def loginUser(request):
    page = "login"
    form = CustomUserLoginForm()

    if request.method == "POST":
        form = CustomUserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            user = authenticate(request, username=username, password=password)
            if user is not None:
                print("User authenticated: ", user)
                login(request, user)
                print("User logged in: ", request.user)
                return redirect("api:main")
            else:
                messages.error(request, "Username OR Password does not exist")
        else:
            print("Form is not valid: ", form.errors)
    else:
        form = CustomUserLoginForm()

    return render(request, "api/spa/login_register.html", {"form": form})


# LOGOUT VIEW
# def logoutUser(request):
#     logout(request)
#     messages.error(request, 'User was successfully logged out')
#     return redirect('api:login')


def logoutUser(request):
    logout(request)
    # Instead of redirecting, return a JSON response
    return JsonResponse(
        {"success": True, "message": "User was successfully logged out"}
    )


# REGISTER VIEW
def registerUser(request):
    page = "register"
    form = CustomUserCreationForm()

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            # user.username = user.username.lower()
            user.save()

            messages.success(request, "User account was created!")

            login(request, user)
            return redirect("api:main")

        else:
            messages.error(request, "An error has occurred during registration.")

    context = {
        "page": page,
        "form": form,
    }

    return render(request, "api/spa/login_register.html", context)


def get_profile(request):
    if request.user.is_authenticated:
        profile = Profile.objects.get(user=request.user)
        return JsonResponse(
            {
                "username": request.user.username,
                "email": request.user.email,
                "full_name": profile.full_name,
                "bio": profile.bio,
                "image": profile.image.url if profile.image else None,
            }
        )
    return JsonResponse({"error": "Not authenticated"}, status=401)


def get_articles(request):
    print("GET ARTICLES")
    Articles = []
    for article in Article.objects.all().values():
        Articles.append(article)
    return JsonResponse({"Articles": Articles})


def get_article(request, article_id):
    # if not request.user.is_authenticated:
    #     return HttpResponse("Unauthorized", status=401)
    return JsonResponse(model_to_dict(get_object_or_404(Article, pk=article_id)))


def comment_response(comment: Comment):
    return {
        "id": comment.id,
        "article_id": comment.article.id,
        "user_id": comment.user.id,
        "parent_comment_id": comment.parent_comment.id
        if comment.parent_comment
        else None,
        "text": comment.text,
        "created": comment.created,
        "updated": comment.updated,
    }


@csrf_exempt
def handle_comments(request: HttpRequest, article_id: int):
    """handles the GET all article comments and POST new top level comment"""
    # if not request.user.is_authenticated:
    #     return HttpResponse("Unauthorized", status=401)
    # user = request.user
    user = get_object_or_404(User, pk=1)
    article = get_object_or_404(Article, pk=article_id)

    if request.method == "GET":
        comments = list(
            Comment.objects.filter(article=article).values()
        )  # return all levels in flat list
        return JsonResponse(comments, safe=False)
    elif request.method == "POST":
        data = json.loads(request.body)
        comment = Comment.objects.create(**data | {"user": user, "article": article})
        return JsonResponse(comment_response(comment))

    return HttpResponseNotAllowed(["GET", "POST"])


@csrf_exempt
def handle_comment(request: HttpRequest, article_id: int, comment_id: int):
    """handles GET one comment PUT,PATCH and DELETE"""
    # if not request.user.is_authenticated:
    #     return HttpResponse("Unauthorized", status=401)
    # user = request.user
    user = get_object_or_404(User, pk=1)
    article = get_object_or_404(Article, pk=article_id)
    comment = get_object_or_404(Comment, pk=comment_id)

    if request.method == "POST":
        data = json.loads(request.body)
        new_comment = Comment.objects.create(
            **data | {"user": user, "article": article, "parent_comment": comment}
        )
        return JsonResponse(comment_response(new_comment))

    if request.method == "DELETE":
        response = model_to_dict(comment)
        comment.delete()
        return JsonResponse(response)

    if request.method in ["PUT", "PATCH"]:
        data = json.loads(request.body)
        for field in ["text"]:
            if field in data:
                comment.__setattr__(field, data[field])
        comment.save()
    # GET
    return JsonResponse(comment_response(comment))
    # return JsonResponse(model_to_dict(comment))


# PROFILES VIEW
# def profiles(request):
#     profiles = Profile.objects.all()
#     context = {
#         'profiles' : profiles,
#     }
#     return render(request, '')
