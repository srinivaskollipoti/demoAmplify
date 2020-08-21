import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createUsers } from "./graphql/mutations";
import {getUsers} from "./graphql/queries"

Amplify.configure(awsconfig);

async function createUser(name, email) {
  const user = {
    name,
    email
  };
  return await API.graphql(graphqlOperation(createUsers, { input: user }));
}

async function getUserById(id) {
    console.log(id)
    return await API.graphql(graphqlOperation(getUsers, { id }));
  }

const MutationButton = document.getElementById("submit-btn");
const MutationResult = document.getElementById("result");
const QueryUser = document.getElementById("fetch-user-btn");

MutationButton.addEventListener("click", (evt) => {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    createUser(name, email).then((response) => {
      console.log(response);
      MutationResult.innerHTML += `<p>User added - ${response.data.createUsers.name} - ${response.data.createUsers.email} ID ${response.data.createUsers.id}</p>`;
    });
});

QueryUser.addEventListener("click", evt => {
    var userId = document.getElementById("userid").value;
    getUserById(userId).then((response) => {
      console.log(response);
        userList.innerHTML += `<p>User name ${response.data.getUsers.name} and email ${response.data.getUsers.email}</p>`;
    })
})