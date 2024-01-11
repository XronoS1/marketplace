from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse_lazy
from django.contrib.auth import logout
from django.views.generic import ListView, UpdateView, CreateView, TemplateView
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from .models import *
from .forms import ProductForm, DataCreateForm, CommentsCreateForm

from cart.forms import CartAddProductForm
from cart.cart import Cart


# вывод товаров
class ProductList(ListView):
    model = Product
    template_name = 'market/catalog.html'
    context_object_name = 'products'

    # достаем категории
    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context


# товары по определенной категории
class ProductsOfCategory(ListView):
    model = Product
    template_name = 'market/products_of_category.html'
    context_object_name = 'products'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['category'] = Category.objects.get(pk=self.kwargs['pk'])
        return context

    def get_queryset(self):
        return Product.objects.filter(category=self.kwargs['pk'])


# просмотр товара
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    cart_product_form = CartAddProductForm()
    return render(request, 'market/product.html', {'product': product,
                                                   'cart_product_form': cart_product_form})


# Создание данных пользователя
class DataCreate(LoginRequiredMixin, CreateView):
    model = Data
    form_class = DataCreateForm
    template_name = 'market/data_create.html'
    success_url = reverse_lazy('cabinet')

    #  добавление юзера
    def form_valid(self, form):
        cd = form.save(commit=False)
        cd.user = self.request.user
        return super().form_valid(form)


# изменение данных пользователя
class DataUpdate(LoginRequiredMixin, UpdateView):
    model = Data
    form_class = DataCreateForm
    template_name = 'market/data_create.html'
    success_url = reverse_lazy('cabinet')

    #  добавление юзера
    def form_valid(self, form):
        cd = form.save(commit=False)
        cd.user = self.request.user
        return super().form_valid(form)


# кабинет
class CabinetView(LoginRequiredMixin, TemplateView):
    template_name = 'market/cabinet.html'


class AboutView(TemplateView):
    template_name = 'market/aboutus.html'


class ContactView(TemplateView):
    template_name = 'contacts.html'


class CatalogView(TemplateView):
    template_name = 'market/catalog.html'


class CheckoutView(TemplateView):
    template_name = 'checkout.html'


class MainView(TemplateView):
    template_name = 'index.html'


# создания заказа
@login_required
def order_create(request):
    cart = Cart(request)
    data = Data.objects.get(user=request.user)
    if data:
        for item in cart:
            Delivery.objects.create(data=Data.objects.get(user=request.user),
                                    product=item['product'],
                                    price=item['price'],
                                    quantity=item['quantity'])
        # очистка корзины
        cart.clear()
        return render(request, 'market/order_created.html')
    else:
        return redirect('data_create')


# выход
@login_required
def logout_view(request):
    logout(request)
    return render(request, 'market/logout.html')


# создание комментария
def comment_add(request, pk):
    if request.method == 'POST':
        product = get_object_or_404(Product, pk=pk)
        form = CommentsCreateForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            c = Comments.objects.create(
                user=request.user,
                product=product,
                comment=cd['comment'],
                rate=cd['rate']
            )
            c.save()
            Product.objects.get(pk=pk).update_rate()
            return HttpResponse(render(request, 'market/comment_created.html'))
    else:
        form = CommentsCreateForm()
        return render(request, 'market/comment_create.html', context={'form': form})


# class CommentCreate(LoginRequiredMixin, CreateView):
#     model = Comments
#     form_class = CommentsCreateForm
#     template_name = 'market/comment_create.html'
#     success_url = reverse_lazy('cabinet')
#
#     def post(self, request, *args, **kwargs):
#         pk = self.kwargs['pk']
#         print(111111, pk)
#         print(2222222, request)
#         print(3333333, args)
#
#     #  добавление юзера
#     def form_valid(self, form):
#         cd = form.save(commit=False)
#         cd.user = self.request.user
#         cd.product = self.request
#         return super().form_valid(form)



