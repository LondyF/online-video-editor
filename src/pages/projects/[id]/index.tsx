import { Player } from "@remotion/player";
import { Button, PageHeader, Result, Spin } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";

import Spacer from "../../../components/spacer";
import {
  Color,
  Fade,
  Scale,
  TranslateX,
} from "../../../components/video/effects";

import { trpc } from "../../../utils/trpc";

const Text: React.FC<{
  style?: React.CSSProperties;
  fontSize?: React.CSSProperties["fontSize"];
  children: string;
}> = ({ style, children, fontSize }) => {
  return (
    <h1
      style={{
        fontFamily: "Anton",
        fontWeight: "600",
        fontSize: fontSize ? fontSize : "inherit",
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

const Box: React.FC<{
  style: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  return <div style={style}>{children}</div>;
};

const FPS = 30;

const Intro: React.FC = () => {
  return (
    <Sequence durationInFrames={FPS * 3} from={0} layout="absolute-fill">
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Fade>
          <TranslateX duration={2000} from={-100} to={25}>
            <Text fontSize={60}>Hey You!</Text>
          </TranslateX>
        </Fade>
        <TranslateX duration={2000} from={150} to={25}>
          <Text fontSize={40} style={{ marginTop: -30 }}>
            Yes, yes, you!
          </Text>
        </TranslateX>
      </AbsoluteFill>
    </Sequence>
  );
};

const WannaMake: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2.5}
      from={FPS * 3}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade duration={2500} from={0} to={1}>
          <Text fontSize={40} style={{ textAlign: "center" }}>
            Look at me fading in
          </Text>
        </Fade>
      </AbsoluteFill>
    </Sequence>
  );
};

const AwesomeVideos: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2}
      from={FPS * 5.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fade duration={2500} from={0} to={1}>
          <Text fontSize={40} style={{ textAlign: "center" }}>
            I am also fading it
          </Text>
        </Fade>
      </AbsoluteFill>
    </Sequence>
  );
};

const UsingJavascript: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 3}
      from={FPS * 7.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Rotate duration={2000} from={0} to={360}> */}
        <Fade>
          <Text fontSize={40} style={{ textAlign: "center" }}>
            I am rotating / fading
          </Text>
        </Fade>
        {/* </Rotate> */}
      </AbsoluteFill>
    </Sequence>
  );
};

const LetsGetStarted: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2}
      from={FPS * 10.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scale duration={1750} to={200}>
          <Box
            style={{
              background: "#FFB6C1",
              borderRadius: "100%",
              width: 10,
              height: 10,
            }}
          />
        </Scale>
      </AbsoluteFill>
    </Sequence>
  );
};

const LetsGetStartedTwo: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2}
      from={FPS * 12.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFB6C1",
        }}
      >
        <Scale duration={1750} to={200}>
          <Box
            style={{
              background: "white",
              borderRadius: "100%",
              width: 10,
              height: 10,
            }}
          />
        </Scale>
      </AbsoluteFill>
    </Sequence>
  );
};

const LetsGetStartedThree: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2}
      from={FPS * 14.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scale duration={1750} to={200}>
          <Box
            style={{
              background: "#FFD580",
              borderRadius: "100%",
              width: 10,
              height: 10,
            }}
          />
        </Scale>
      </AbsoluteFill>
    </Sequence>
  );
};

const LetsGetStartedFour: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 2}
      from={FPS * 16.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFD580",
        }}
      >
        <Scale duration={1750} to={200}>
          <Box
            style={{
              background: "#90EE90",
              borderRadius: "100%",
              width: 10,
              height: 10,
            }}
          />
        </Scale>
      </AbsoluteFill>
    </Sequence>
  );
};

const LetsGetStartedFive: React.FC = () => {
  return (
    <Sequence
      durationInFrames={FPS * 4.5}
      from={FPS * 18.5}
      layout="absolute-fill"
    >
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#90EE90",
        }}
      >
        <Fade duration={500}>
          <Color from="#FFB6C1" to="#00008B">
            <Box
              style={{
                borderRadius: "100%",
                width: 10,
                height: 10,
              }}
            />
            <Text>This box is changing color</Text>
          </Color>
        </Fade>
      </AbsoluteFill>
    </Sequence>
  );
};

const MyVideo = () => {
  return (
    <AbsoluteFill>
      <Intro />
      <WannaMake />
      <AwesomeVideos />
      <UsingJavascript />
      <LetsGetStarted />
      <LetsGetStartedTwo />
      <LetsGetStartedThree />
      <LetsGetStartedFour />
      <LetsGetStartedFive />
    </AbsoluteFill>
  );
};

const NoProjectFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="Project Not Found"
      subTitle="The project you are looking for doesn't exist"
    />
  );
};

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const project = trpc.project.byId.useQuery(String(id));

  if (project.isLoading) {
    return <Spin />;
  }

  if (project.error) {
    return <NoProjectFound />;
  }

  const { name } = project.data;

  const handleBack = () => {
    router.push("/projects");
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <PageHeader onBack={handleBack} title={name} />
        <Link href={`${router.asPath}/collaborators`}>
          <Button type="ghost">Collaborators</Button>
        </Link>
      </div>
      <hr />
      <Spacer vertical={25} />
      <Player
        loop
        component={() => <MyVideo />}
        durationInFrames={30 * 24}
        compositionWidth={500}
        compositionHeight={500}
        fps={30}
        controls
      />
    </div>
  );
};

export default Project;
