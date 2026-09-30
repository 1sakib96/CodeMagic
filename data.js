// Course content. To add a language, add one object here – the UI builds itself.
const COURSES = [
{group:"Programming",id:"c",name:"C",ext:"c",lessons:[
 {t:"Hello, World",p:"Every C program starts in main(). printf prints text; \\n adds a new line.",c:'#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}'},
 {t:"Variables and input",p:"Declare a variable with its type (int, float, char). scanf reads input; note the & before the variable.",c:'#include <stdio.h>\n\nint main() {\n    int age;\n    printf("Enter age: ");\n    scanf("%d", &age);\n    printf("Next year you will be %d\\n", age + 1);\n    return 0;\n}'},
 {t:"Loops",p:"A for loop has a start, a condition and a step.",c:'#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}'}],
 quiz:{q:"Which symbol gives scanf the address of a variable?",o:["*","&","#","%"],a:1}},
{group:"Programming",id:"cpp",name:"C++",ext:"cpp",lessons:[
 {t:"Hello, World",p:"C++ uses iostream. cout prints and << sends values to it.",c:'#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}'},
 {t:"Variables and input",p:"cin reads input with >>. Use string for text.",c:'#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "Your name: ";\n    cin >> name;\n    cout << "Hi, " << name << endl;\n    return 0;\n}'},
 {t:"Vectors",p:"A vector is a resizable list. Range-based for loops visit each item.",c:'#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {3, 5, 8};\n    nums.push_back(13);\n    for (int n : nums) cout << n << " ";\n    return 0;\n}'}],
 quiz:{q:"Which object reads keyboard input in C++?",o:["cout","print","cin","scanf only"],a:2}},
{group:"Programming",id:"python",name:"Python",ext:"py",lessons:[
 {t:"Hello, World",p:"Python needs no main() or semicolons. print() shows output.",c:'print("Hello, World!")'},
 {t:"Variables and input",p:"Variables need no type. input() returns text, so convert it with int() for math.",c:'name = input("Your name: ")\nage = int(input("Age: "))\nprint("Hi", name, "- next year you will be", age + 1)'},
 {t:"Conditions and loops",p:"Python uses a colon and indentation instead of braces.",c:'for i in range(1, 6):\n    if i % 2 == 0:\n        print(i, "is even")\n    else:\n        print(i, "is odd")'}],
 quiz:{q:"What ends the first line of an if statement in Python?",o:["{","a semicolon","a colon",")"],a:2}},
{group:"Web development",id:"html",name:"HTML",ext:"html",lessons:[
 {t:"Page structure",p:"HTML describes content with tags. Every page has a head and a body.",c:'<!DOCTYPE html>\n<html>\n<head><title>My page</title></head>\n<body>\n  <h1>Hello!</h1>\n  <p>This is my first page.</p>\n</body>\n</html>'},
 {t:"Links, images and lists",p:"Use <a> for links, <img> for images and <ul> with <li> for lists.",c:'<h2>My links</h2>\n<ul>\n  <li><a href="https://github.com">GitHub</a></li>\n  <li><a href="https://developer.mozilla.org">MDN Docs</a></li>\n</ul>'},
 {t:"Forms",p:"Forms collect input. Each input should have a label.",c:'<form>\n  <label>Name <input type="text"></label>\n  <button type="button">Send</button>\n</form>'}],
 quiz:{q:"Which tag creates a link?",o:["<link>","<a>","<href>","<url>"],a:1}},
{group:"Web development",id:"css",name:"CSS",ext:"html",lessons:[
 {t:"Selectors and colors",p:"CSS styles HTML. A selector picks elements; properties change how they look. Edit the code and press Run.",c:'<style>\n  h1 { color: rebeccapurple; }\n  p { background: #fff3c4; padding: 8px; }\n</style>\n<h1>Styled title</h1>\n<p>Styled paragraph</p>'},
 {t:"The box model",p:"Every element is a box: content, padding, border, margin.",c:'<style>\n  .box { padding: 16px; border: 3px solid teal; margin: 12px; width: 200px; }\n</style>\n<div class="box">A box</div>'},
 {t:"Flexbox layout",p:"display:flex puts children in a row and lets you space them easily.",c:'<style>\n  .row { display: flex; gap: 10px; justify-content: space-between; }\n  .row div { background: #cfe8ff; padding: 12px; }\n</style>\n<div class="row"><div>One</div><div>Two</div><div>Three</div></div>'}],
 quiz:{q:"Which property adds space inside an element's border?",o:["margin","padding","gap","outline"],a:1}},
{group:"Web development",id:"js",name:"JavaScript",ext:"js",lessons:[
 {t:"Hello, World",p:"console.log prints to the output panel. Use let or const to make variables.",c:'const name = "CodeMagic";\nconsole.log("Hello, " + name + "!");'},
 {t:"Functions and arrays",p:"Functions package reusable steps. Arrays hold lists.",c:'function double(n) {\n  return n * 2;\n}\nconst nums = [1, 2, 3];\nconsole.log(nums.map(double));'},
 {t:"Loops and conditions",p:"Use === to compare values strictly.",c:'for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) console.log(i + " is even");\n  else console.log(i + " is odd");\n}'}],
 quiz:{q:"Which operator compares value AND type?",o:["=","==","===","=>"],a:2}}
];

// One hands-on task per lesson (shown in the "Your turn" box).
const TASKS = {
 c:["Change the message to print your own name.","Ask for a number and print it multiplied by 2.","Change the loop so it counts from 10 to 15."],
 cpp:["Print your city name using cout.","Ask for two words and print them joined by a space.","Add three more numbers to the vector."],
 python:["Print your name and your favorite language.","Ask for a birth year and print the age.","Change range() so it stops at 10."],
 html:["Change the heading and add a second paragraph.","Add a third link to your favorite website.","Add an email input with its own label."],
 css:["Change the heading color to crimson.","Make the border 6px wide and dashed.","Add a fourth box inside the row."],
 js:["Store your name in a constant and print it.","Write a function triple(n) and map it over the array.","Print only the odd numbers."]
};
