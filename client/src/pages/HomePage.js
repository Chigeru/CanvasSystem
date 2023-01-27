import React from "react";
import "../styles/styling.scss";

function HomePage({ users }) {
  const testusers = [];

  console.log(users);

  // users.forEach((user) => {
  //   testusers.push(
  //     <div className="row taskcard" key={user.name}>
  //     <div className="col-6">
  //       <p>{user.name}</p>
  //     </div>
  //     <div className="col-6">
  //       <p>{user.age}</p>
  //     </div>
  //   </div>
  //   );
  // });

  return (
    <div>
      <h1>Homepage</h1>

      <div className="container">
        {users.map((user, id) => {
          return (
            <div className="row taskcard" key={id}>
              <div className="col-6">
                <p>{user.username}</p>
              </div>
              <div className="col-6">
                <p>{user.age}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
