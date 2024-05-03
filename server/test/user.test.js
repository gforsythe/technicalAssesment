import app from '../index.js';
import request from 'supertest';



let server;


beforeAll(() => {
  server = app.listen(3002, () => console.log('Server started on port 3002'));
});

/* Test cases*/


/*GET ID */
describe('User REST API', () => {
  it('should return a unique UUID from /id', async () => {

    const response = await request(app).get('/id').expect(200);

    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('string');


  });


  /*get user's info */

  it('should return user info from /api/v1/users/:id', async () => {
    const userId = '123e4567-e89b-12d3-a456-426614174001';
    const response = await request(app).get(`/api/v1/users/${userId}`).expect(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  /*Return 404 for not finding user */
  it('should return a 404 if user is not found', async () => {
    const nonExistentUUID = "123e4567-e89b-12d3-a456-426614176001";
    await request(app).get(`/api/v1/users/${nonExistentUUID}`).expect(404);

  });

  /*Create a new user */
  it('should create a new user to the mockdata base', async () => {
    const newUser = { name: 'Habana', diet: "vegetarian" };
    const response = await request(app).post(`/api/v1/users`).send(newUser).expect(201);
    expect(response.body).toHaveProperty('newUser');
    expect(response.body).toHaveProperty('newUser.name', 'Habana');
  });


  /* Create new user should work 50% of the time */
  it('should create a post request with a 50% success rate ', async () => {
    const success = Math.random() > 0.5;
    const newUser = { name: "Jo", diet: "meat" };

   const response =  await request(app).post("/api/v1/users").send(newUser)

    if (response.status === 201) {
      expect(response.body).toHaveProperty('newUser.name', "Jo");
    } else if (response.status === 500){
      expect(response.body).toHaveProperty('error');
    }else{
      throw new Error(`Unexpected status code: ${response.status}`)
    }

  });

});


afterAll(() => {
  server.close();
})

