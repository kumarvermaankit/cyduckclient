import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./styles/SignIn";
import SignUp from "./SignUp";
import Home from "./StartingPage"
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./Unauthenticatedroute";
import StartingPage from "./StartingPage";
import CommunityFile from "./CommunityFile";
import File from "./addfile";



import CodeM from "./cm"
import Searching from "./searching"
import MyQuestions from "./myquestions"
import Qcode from "./qcode"
import Profile from "./Profile"

import Editor from "./codeeditor"
// import CKEditor from "./quillanswer";
import FAQ from "./faq"
import Batch from "./batch"
import Groups from "./eachCommunity";
import GroupSearch from "./groupSearch";
import Stringsearch from "./stringsearch";


function Routes() {

  return (

    <Router>



      <UnauthenticatedRoute exact path="/signin">
        <SignIn />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <SignUp />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/">
        <StartingPage />
      </UnauthenticatedRoute>

      <Route exact path="/community">
        <CommunityFile />
      </Route>
      <AuthenticatedRoute exact path="/file">
        <File />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/batch">
        <Batch />
      </AuthenticatedRoute>
      {/* <AuthenticatedRoute exact path="/quill">
  <CKEditor />
  </AuthenticatedRoute> */}
      <AuthenticatedRoute exact path="/editor">
        <Editor />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/faq">
        <FAQ />
      </AuthenticatedRoute>


      <AuthenticatedRoute exact path="/codemirror">
        <CodeM />
      </AuthenticatedRoute>
      <Route exact path="/search/:languages/:fields/:frameworks">
        <Searching />
      </Route>
      <AuthenticatedRoute exact path="/myq">
        <MyQuestions />
      </AuthenticatedRoute>


      <AuthenticatedRoute exact path="/pro_file/:username">
        <Profile />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/groups/:name">
        <Groups />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/groupsearch/:name/:languages/:fields/:frameworks">
        <GroupSearch />
      </AuthenticatedRoute>

      <Route exact path="/ques/:id/:document/:username">
        <Qcode />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/stringsearch/:string">
        <Stringsearch />
      </Route>


    </Router>
  )



}

export default Routes