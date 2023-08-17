import React, { FC, SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Tab, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Photo, Profile } from "../../app/types/profile";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

interface ProfilePhotoProps {
  profile: Profile;
}

const ProfilePhotos: FC<ProfilePhotoProps> = ({ profile }) => {
  const {
    profileStore: { isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto },
} = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");
  console.log("🚀 ~ file: ProfilePhotos.tsx:14 ~ isCurrentUser:", isCurrentUser);
  
  console.log("🚀 ~ file: ProfilePhotos.tsx:17 ~ addPhotoMode:", addPhotoMode)
  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header icon="image" content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color="green"
                        content="Main"
                        name={"main" + photo.id}
                        disabled={photo.isMain}
                        loading={target === "main" + photo.id && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button
                        basic
                        color="red"
                        icon="trash"
                        loading={target === photo.id && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        disabled={photo.isMain}
                        name={photo.id}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
