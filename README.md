Part 0 - Estimation.
Well, about disadvantages of the existing solution. From my point of view there are couple of them:

1) all script files has been included in the beginning of the file. That may block rendering the dom until they loaded.

2) in function calculateDiscount:

    a) the checking of book instance is absent.
    
    b) variabled "discount" is not declared. It means, that this is global variable. Later on, somewhere it could be changed to, let say, 100. So discount will be more then 100% after all calculatin.
    
    c) minor things in styling: I do prefer to add semi-colomm and put curly braces in if statement.
    
3) for creating a book element there is to much DOM work. First, it each time create new Html element and wrap it to jQuery.

Then for each book, each property it makes a query to the DOM to find the element. Also it bind the click event to every delete button, instead of delegate it.

It could be the issue of leaking the memory. When you creating and removing a thousands of books. Even worth, that remove function contains link to $element, so it will not be collected by garbage collector.

4) Then the global thing, that every property to fill up with data or create new book depended on Html markup. If somebody will change the element id or class it will fail.

5) Creating the new book object uses the eval function, which is not really good.

