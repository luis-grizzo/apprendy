import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Post from '../pages/Post';
import User from '../pages/User';
import Search from '../pages/Search';
import ContentResource from '../pages/Content/Resource';
import ContentTag from '../pages/Content/Tag';
import ContentTool from '../pages/Content/Tool';
import ContentCategory from '../pages/Content/Category';
import ContentUser from '../pages/Content/User';
import ContentQuestion from '../pages/Content/Question';
import AdminResources from '../pages/Admin/Resources';
import AdminTags from '../pages/Admin/Tags';
import AdminTools from '../pages/Admin/Tools';
import AdminCategories from '../pages/Admin/Categories';
import AdminUsers from '../pages/Admin/Users';
import AdminQuestions from '../pages/Admin/Questions';
import Comunity from '../pages/Comunity';
import Question from '../pages/Question';
import PrivateRoute from '../auth/PrivateRoute';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Redirect to="/" exact from="/home" />

      <Route path="/login" exact component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/post/:id" component={Post} />
      <PrivateRoute path="/user/:id" component={User} />
      <PrivateRoute path="/search/:id" component={Search} />
      <PrivateRoute path="/content/resource" component={ContentResource} />
      <PrivateRoute path="/content/tag" component={ContentTag} />
      <PrivateRoute path="/content/tool" component={ContentTool} />
      <PrivateRoute path="/content/category" component={ContentCategory} />
      <PrivateRoute path="/content/user" component={ContentUser} />
      <PrivateRoute path="/content/question" component={ContentQuestion} />
      <PrivateRoute path="/admin/resources" component={AdminResources} />
      <PrivateRoute path="/admin/tags" component={AdminTags} />
      <PrivateRoute path="/admin/tools" component={AdminTools} />
      <PrivateRoute path="/admin/categories" component={AdminCategories} />
      <PrivateRoute path="/admin/users" component={AdminUsers} />
      <PrivateRoute path="/admin/questions" component={AdminQuestions} />
      <PrivateRoute path="/comunity" component={Comunity} />
      <PrivateRoute path="/question/:id" component={Question} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
