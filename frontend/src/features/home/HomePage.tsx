import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import Login from "../users/Login";
import Register from "../users/Register";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 12 }} />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button as={Link} to="/activites" size="huge" inverted>
              Go to Activities!
            </Button>
          </>
        ) : (
          <>
          <Button onClick={() => modalStore.openModal(<Login/>)}  size="huge" inverted>
            Login!
          </Button>
          <Button onClick={() => modalStore.openModal(<Register/>)}  size="huge" inverted>
            Register!
          </Button>
          </>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
