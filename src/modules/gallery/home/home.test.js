import React from "react";
import configureStore from "store";

import GalleryPage from "./index";
import Header from "components/header";
import Alert from "components/Alert";
import FavoriteCard from "components/favoriteCard";
import ImageCard from "components/imageCard";

import { shallow, mount } from "enzyme";

const store = configureStore({}, null);

describe("rendering components", () => {
  it("renders Gallery page without crashing", () => {
    shallow(<GalleryPage store={store} />).dive();
  });

  it("renders header to gallery page without crashing", () => {
    shallow(<Header />);
  });

  it("renders notifications to gallery page without crashing", () => {
    shallow(<Alert />);
  });

  it("renders favorite card to gallery page without crashing", () => {
    shallow(<FavoriteCard />);
  });

  it("renders image card to gallery page without crashing", () => {
    shallow(<ImageCard />);
  });
});

const headerProps = {
  userName: "testName",
  userEmail: "testEmail@test.com",
  profilePicture: "https://placeimg.com/640/640/people",
};

const favoriteCardProps = {
  image: "https://placeimg.com/640/640/people",
  index: 2,
  onClick: () => {},
};

const imageCardProps = {
  image: "https://placeimg.com/640/640/people",
  onClick: () => {},
};

describe("passing props", () => {
  const headerWrapper = mount(
    <Header
      profilePicture={headerProps.profilePicture}
      userName={headerProps.userName}
      userEmail={headerProps.userEmail}
    />
  );

  it("header accept props", () => {
    expect(headerWrapper.props().profilePicture).toEqual(
      headerProps.profilePicture
    );
    expect(headerWrapper.props().userName).toEqual(headerProps.userName);
    expect(headerWrapper.props().userEmail).toEqual(headerProps.userEmail);
  });

  it("rendering values in header", () => {
    const renderedName = headerWrapper
      .find(".header-profile-contact-name")
      .text();
    expect(renderedName).toEqual(headerProps.userName);
  });

  const favoriteCardWrapper = mount(
    <FavoriteCard
      image={favoriteCardProps.image}
      index={favoriteCardProps.index}
      onClick={favoriteCardProps.onClick}
    />
  );

  it("favorite card accept props", () => {
    expect(favoriteCardWrapper.props().image).toEqual(favoriteCardProps.image);
    expect(favoriteCardWrapper.props().index).toEqual(favoriteCardProps.index);
    expect(favoriteCardWrapper.props().onClick).toEqual(
      favoriteCardProps.onClick
    );
  });

  it("rendering values in favoriteCard", () => {
    const imageIndex = favoriteCardWrapper.find(".image-card-title").text();
    expect(imageIndex).toEqual("THREE");
  });

  const imageCardWrapper = mount(
    <ImageCard image={imageCardProps.image} onClick={imageCardProps.onClick} />
  );

  it("image card accept props", () => {
    expect(imageCardWrapper.props().image).toEqual(imageCardProps.image);
    expect(imageCardWrapper.props().onClick).toEqual(imageCardProps.onClick);
  });
});

describe("component functioning", () => {
  const galleryPageWrapper = mount(<GalleryPage store={store} />);

  it("favorite section limitations", () => {
    expect(galleryPageWrapper.find(FavoriteCard).length).toBeLessThan(10);
  });
});
