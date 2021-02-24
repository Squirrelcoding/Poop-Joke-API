# Poop Joke API
Poop Joke API is an API that you can receive, post, and report poop jokes! Not only that, but it is the very first poop joke API in the world! It is a very original idea and concept.

# Website
You can go to https://poopjokes.apis.softsquirrel.tk/join for more information about the API. Along with that, you can create your API key when you scroll down enough.

# Documentation
The docs provided on the website look horrible because the creator of the API, (aka me) is horrible at CSS and doesn't know much of it.

## `GET` requests
### Get a poop joke 
`https://poopjokes.apis.softsquirrel.tk/random?key=example`\
You can get a random poop joke using the URL above. Although there are only like 3 jokes in the database so you wont get much of a variety of jokes.

### Getting a poop joke by ID

`https://poopjokes.apis.softsquirrel.tk/byID?key=example&id=[3]`\
Want a specific poop joke? Well now you can do that with the URL provided above!

### Recieving all poop jokes

`https://poopjokes.apis.softsquirrel.tk/all?key=example`\
You can get all the poop jokes with the URL above! Now get ready for the funniest poop jokes ever!

## `POST` requests

### Submitting a poop joke
`https://poopjokes.apis.softsquirrel.tk/submitJoke?key=example`\
Want to submit your very own poop joke? You can do that with the URL above and the code below! This is in Axios with Node.js 12.16.1
```js
axios({
  method: 'post',
  url: 'https://poopjokes.apis.softsquirrel.tk/submitJoke?key=example',
  data: {
    joke: "Your Joke here!"
  }
})
```

### Reporting a poop joke
`https://poopjokes.apis.softsquirrel.tk/reportJoke?key=example`\
Find a poop joke unfunny, cringe, or inappropiate? You can report a poop joke with the URL above and the Code below!
```js
axios({
  method: 'post',
  url: 'https://poopjokes.apis.softsquirrel.tk/reportJoke?key=example',
  data: {
    id: <Poop joke ID here>,
    reason: "Your report here"
  }
})
```

# Conclusion
We hope that you enjoy our poop joke API and we could use some feedback! You can report bugs or send feedback in the `issues` section of this repo. Don't forget to check out the [site](https://poopjokes.apis.softsquirrel.tk/join) to get your API key!
