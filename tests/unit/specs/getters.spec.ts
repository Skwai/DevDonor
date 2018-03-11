import * as getters from '@/store/getters'

describe('getters.ts', () => {
  describe('getProjects', () => {
    it('returns an array of projects that are in the store', () => {
      const state = {
        projects: {
          project1: {
            title: 'test'
          },
          project2: {
            title: 'test'
          }
        }
      } as any
      expect(getters.getProjects(state)).toHaveLength(2)
    })
  })

  describe('getCurrentUser', () => {
    it('returns the current user in the store if there is one', () => {
      const state = {
        currentUser: {
          name: 'Doritio Memer'
        }
      } as any
      expect(getters.getCurrentUser(state)).toEqual({
        name: 'Doritio Memer'
      })
    })

    it('returns null if there is no user', () => {
      const state = {
        currentUser: null
      } as any
      expect(getters.getCurrentUser(state)).toBeNull()
    })
  })

  describe('getCurrentUserId', () => {
    it(`returns the current user's UID if there is one`, () => {
      const state = {
        currentUser: {
          uid: 'user1234',
          name: 'Doritio Memer'
        }
      } as any
      expect(getters.getCurrentUserId(state)).toBe('user1234')
    })
  })
})
