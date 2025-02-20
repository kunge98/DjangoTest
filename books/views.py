from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm, LoginForm
from .models import Book
from django.contrib import messages
from django.shortcuts import render
from django.templatetags.static import static


def home(request):
    return render(request, 'books/home.html')

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # 自动登录
            messages.success(request, "注册成功，已自动登录！")
            return redirect('book_list')
        else:
            messages.error(request, "注册失败，请检查输入信息！")
    else:
        form = RegisterForm()
    return render(request, 'books/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, "登录成功！")
            return redirect('book_list')
        else:
            messages.error(request, "用户名或密码错误，请重试！")
    else:
        form = LoginForm()
    return render(request, 'books/login.html', {'form': form})

def user_logout(request):
    logout(request)
    messages.info(request, "您已成功退出！")
    return redirect('home')

@login_required
def book_list(request):
    sort_by = request.GET.get('sort', 'title')  # 获取排序字段，默认按名字排序
    order = request.GET.get('order', 'asc')    # 获取排序顺序，默认升序

    # 确定排序规则
    sort_field = sort_by if order == 'asc' else f"-{sort_by}"
    books = Book.objects.all().order_by(sort_field)  # 根据排序规则查询图书

    # 传递当前排序信息到模板
    return render(request, 'books/book_list.html', {
        'books': books,
        'current_sort': sort_by,
        'current_order': order,
    })


@login_required
def book_add(request):
    if request.method == 'POST':
        title = request.POST['title']
        issn = request.POST['issn']
        publish_date = request.POST['publish_date']
        stock = request.POST['stock']
        category = request.POST['category']  # 获取分类字段
        Book.objects.create(
            title=title,
            issn=issn,
            publish_date=publish_date,
            stock=stock,
            category=category
        )
        return redirect('book_list')
    return render(request, 'books/book_add.html')


@login_required
def book_edit(request, book_id):
    book = Book.objects.get(id=book_id)
    if request.method == 'POST':
        book.title = request.POST['title']
        book.issn = request.POST['issn']
        book.publish_date = request.POST['publish_date']
        book.stock = request.POST['stock']
        book.save()
        return redirect('book_list')
    return render(request, 'books/book_edit.html', {'book': book})


@login_required
def book_delete(request, book_id):
    book = Book.objects.get(id=book_id)
    book.delete()
    return redirect('book_list')
