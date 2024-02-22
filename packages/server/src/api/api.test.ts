import request from 'supertest'
import { app } from '../server'
import { TrackTypes, type PostTrack, type PostUser, UserRoles } from '../types'

describe('api', () => {
  it('should create track', async () => {
    // Given
    const track: PostTrack = {
      name: 'MIKS',
      type: TrackTypes.kart,
      configs: [{ img: 'rgdjhgf-hjkg-wqF-WASFDGX-EFDSG' }],
      rating: {
        value: 0
      }
    }
    // When
    const response = await request(app)
      .post('/tracks')
      .send(track)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    // Then
    response
      .expect(200)
      .expect(response.body)
      .toEqual(track)
  })

  it('should create user', async () => {
    // Given
    const user: PostUser = {
      nickName: 'Stasyao San',
      role: UserRoles.user
    }
    // When
    const response = await request(app)
      .post('/users')
      .send(user)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
    // Then
    response
      .expect(200)
      .expect(response.body)
      .toEqual(user)
  })
})
