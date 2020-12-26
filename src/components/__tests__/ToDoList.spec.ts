import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/vue'
import ToDoList from '../ToDoList.vue'

describe('To Do List', () => {
  test('adds a new to-do to the list', async () => {
    const { getByLabelText, getByText } = render(ToDoList)
  
    const toDoInput = getByLabelText('Add task +')
  
    await fireEvent.update(toDoInput, 'This is a brand new to-do')
    await fireEvent.keyDown(toDoInput, { key: 'Enter', code: 'Enter'})
  
    getByText('This is a brand new to-do')
  })
  
  test('marks a to-do as completed and then uncompleted', async () => {
    const { getByLabelText, getByText } = render(ToDoList)
  
    const toDoInput = getByLabelText('Add task +')
  
    await fireEvent.update(toDoInput, 'A foo to-do')
    await fireEvent.keyDown(toDoInput, { key: 'Enter', code: 'Enter'})
    
    const completeCheckbox = getByLabelText('Complete to do')
  
    await fireEvent.update(completeCheckbox, 'true')
  
    expect(completeCheckbox).toBeChecked()
    expect(getByText('A foo to-do')).toHaveClass('completed')
  
    await fireEvent.update(completeCheckbox, 'false')
  
    expect(completeCheckbox).not.toBeChecked()
    expect(getByText('A foo to-do')).not.toHaveClass('completed')
  })

  test('delete to-do from list', async () => {
    const { getByLabelText, getByText, queryByText, getByTestId } = render(ToDoList)

    const toDoInput = getByLabelText('Add task +')

    await fireEvent.update(toDoInput, 'This will be removed soon')
    await fireEvent.keyDown(toDoInput, { key: 'Enter', code: 'Enter'})

    const deleteButton = getByText('Delete')

    await fireEvent.click(deleteButton)

    expect(queryByText('This will be removed soon')).toBeNull()
    expect(getByTestId('to-do-list').childElementCount).toEqual(0)
  })
})


