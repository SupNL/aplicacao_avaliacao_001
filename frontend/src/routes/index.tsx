import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ListPosts from '../pages/ViewPost/ListPosts'
import InfoPost from '../pages/ViewPost/InfoPost'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Redirect to="/posts" />
            </Route>
            <Route path="/posts" exact component={ListPosts} />
            <Route path="/posts/:postId" exact component={InfoPost} />
        </Switch>
    )
}

export default Routes;