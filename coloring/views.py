from django.shortcuts import render

def index(request):
    return render(request, 'coloring/index.html')

def coloringPage(request):
    return render(request, 'coloring/coloringPage.html')