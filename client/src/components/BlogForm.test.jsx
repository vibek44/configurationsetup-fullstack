import BlogForm from './BlogForm'
import { render,screen } from '@testing-library/react'
import { describe, test, expect,vi } from 'vitest'
import  userEvent  from '@testing-library/user-event'

describe('blogform is working correctly',() => {
  test('form input elements and submit button works', async() => {
    const handleBlogForm=vi.fn()
    const user=userEvent.setup()
    render(<BlogForm handleBlogForm={handleBlogForm}/>)
    const titleInput=screen.getByLabelText('title')
    const authorInput=screen.getByLabelText('author')
    const urlInput=screen.getByLabelText('url')
    const submitButton=screen.getByText('submit')
    expect(titleInput).toBeDefined()
    expect(authorInput).toBeDefined()
    expect(urlInput).toBeDefined()
    await user.type(titleInput,'Game design research')
    await user.type(authorInput,'Petri Lankoski')
    await user.type(urlInput,'https://it-ebooks.dev/books/game-development/game-design-research')
    // screen.debug(submitButton)
    await user.click(submitButton)
    expect(handleBlogForm).toHaveBeenCalledOnce()
    expect(handleBlogForm.mock.calls[0][0].title).toBe('Game design research')
    expect(handleBlogForm.mock.calls[0][0].author).toBe('Petri Lankoski')
    expect(handleBlogForm.mock.calls[0][0].url).toBe('https://it-ebooks.dev/books/game-development/game-design-research')
    //console.log(handleBlogForm.mock.calls);
  })

})