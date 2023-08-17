import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { useStore } from "../../app/stores/store";
import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm";

interface ProfileAboutProps {}

const ProfileAbout: FC<ProfileAboutProps> = ({}) => {
  const { profileStore } = useStore();
  const { isCurrentUser, profile } = profileStore;
  const [editMode, setEditMode] = useState(false);
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width="16">
          <Header floated="left" icon="user" content={`About ${profile?.displayName}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "EditProfile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width="16">
          {editMode ? (
            <ProfileEditForm setEditMode={setEditMode} />
          ) : (
            <span style={{ whiteSpace: "pre-wrap" }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileAbout);
