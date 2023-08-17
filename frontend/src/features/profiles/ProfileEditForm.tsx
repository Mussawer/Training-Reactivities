import { profile } from "console";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface ProfileEditFormProps {
  setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm: FC<ProfileEditFormProps> = ({ setEditMode }) => {
  const { profileStore } = useStore();
  const { profile, updateProfile } = profileStore;
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => setEditMode(false));
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="ui form">
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextArea rows={3} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          ></Button>
        </Form>
      )}
    </Formik>
  );
};

export default observer(ProfileEditForm);
