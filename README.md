# mtm_test
Repo for MTM Technical Test


Some notes to help understand the project. 


Installation - 

I set this up with xampp without any config development needed. As the project file is called mtm-test you can simply clone the repo into xampp/htdocs/~

And then go to URL - https://localhost/mtm-test

And it should just work. 

Error that may occur can be resolved by using the following commands - 

composer install 
composer update
npm install webpack --save 

---

The reason behind this is to install twig and allow the components html files to be rendered in the base.html & index.html


Notes on project - 

I've commented in the code but I have used Bootstrap to set up the skeleton of the project for simplicity, however I have not used it for the movie grid or responsiveness. 
I have added some CSS elements purely for showcasing such as the genre list hover element. 
I decided to modify CSS and switch classes in the HTML instead of tweaking the API call for movies lists in the filter functions to adhere to the limit of API calls. 
