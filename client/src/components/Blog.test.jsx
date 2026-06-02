import { render, screen }from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test,describe,vi } from 'vitest'
import Blog from './Blog'


describe('<Blog> component renders ',() => {
  const blog={
    title: 'Go Set a Watchman',
    author: 'Harper lee',
    url:'https://www.bibliofreak.net/2016/08/review-go-set-watchman-by-harper-lee.html',
    likes:9,
    user:{ userName:'bhim123' }
  }

  test('renders content', () => {
    render(<Blog blog={blog}/>)
    const element=screen.getByText(blog.title, { exact:false })
    screen.debug(element)
    expect(element).toHaveTextContent('Go Set a Watchman')
    

  })
  /*
  beforeEach(()=>{
    render(<Blog blog={blog}/>)
   })

  test('renders content', () => {
    render(<Blog blog={blog}/>)
    const element=screen.getAllByText(blog.title, { exact:false })
    //screen.debug(element)
    expect(element[0]).toHaveTextContent('Go Set a Watchman')
    expect(element[1]).not.toBeVisible()

  })
  //container's querySelector method is not recommended as css can change instead use getBy,findBy queries from testing dom library
  test('render blog title and author but not url and likes by default',() => {
    const { container }=render(<Blog blog={blog}/>)
    const element=container.querySelector('.briefly')
    expect(element).toBeVisible()
    expect(element).toHaveTextContent(blog.title)
    expect(element).toHaveTextContent(blog.author)
    expect(element).not.toHaveTextContent(blog.url)
    expect(element).not.toHaveTextContent(`likes:"${blog.likes}`)
    const element2=container.querySelector('.detail')
    expect(element2).not.toBeVisible()

  })

  //container's querySelector method is not recommended as css can change instead use getBy,findBy queries from testing dom library
  test('render url and likes by when button controlling view is clicked',async () => {
    const { container }=render(<Blog blog={blog}/>)
    const element=container.querySelector('.briefly')
    expect(element).toBeVisible()
    const element2=container.querySelector('.detail')
    expect(element2).not.toBeVisible()
    const user=userEvent.setup()
    const button=screen.getByText('view')
    //screen.debug(button)
    await user.click(button)
    expect(element).not.toBeVisible()
    expect(element2).toBeVisible()
    expect(element2).toHaveTextContent(blog.url)
    expect(element2).toHaveTextContent(`likes:${blog.likes}`)


  })

  test('if the likes button is clicked twice,the event handler the component receieve as props is called twice', async() => {
    const handleBlogUpdate=vi.fn()
    render(<Blog blog={blog} handleBlogUpdate={handleBlogUpdate}/>)
    const user=userEvent.setup()
    const element=screen.getByText('like')
    await user.dblClick(element)
    //console.log(handleBlogUpdate.mock)
    expect(handleBlogUpdate.mock.calls).toHaveLength(2)

  })

*/

})
