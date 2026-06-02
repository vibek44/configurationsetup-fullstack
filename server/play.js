const mongoose = require('mongoose')
const Blog=require('./models/blog')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://bhim:${password}@cluster0.1pudu.mongodb.net/testBlogApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })


const blog = new Blog({  
  "title": "Go Set a Watchman", 
  "author": "Harper lee",
  "url":"https://www.bibliofreak.net/2016/08/review-go-set-watchman-by-harper-lee.html",
  "likes":6
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})

/*
class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
    // Getter
     get area() {
      return this.calcArea();
    }
    // Method
    calcArea() {
      return this.height * this.width;
    }
    *getSides() {
      yield this.height;
      yield this.width;
      yield this.height;
      yield this.width;
    }
  }
  
  const square = new Rectangle(10, 10);
  
  console.log(square.area); // 100
  console.log([...square.getSides()]); // [10, 10, 10, 10]
  */