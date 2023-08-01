import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showCode } from "../../../redux/codeSectionSwitch";
import { showUsers } from "../../../redux/usersListSectionSlice";

const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices,
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  const dispatch = useDispatch();

  return (
    <Bar>
      <Left>
        <CameraButton
          onClick={toggleCameraAudio}
          data-switch="video"
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            {userVideoAudio.video ? (
              <FaIcon className="fas fa-video "></FaIcon>
            ) : (
              <FaIcon className="fas fa-video-slash"></FaIcon>
            )}
          </div>
          Camera
        </CameraButton>
        {showVideoDevices && (
          <SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                return (
                  <div
                    key={device.deviceId}
                    onClick={clickCameraDevice}
                    data-value={device.deviceId}
                  >
                    {device.label}
                  </div>
                );
              })}
            <div>Switch Camera</div>
          </SwitchList>
        )}
        <SwitchMenu onClick={handleToggle}>
          <i className="fas fa-angle-up"></i>
        </SwitchMenu>
        <CameraButton
          onClick={toggleCameraAudio}
          data-switch="audio"
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            {userVideoAudio.audio ? (
              <FaIcon className="fas fa-microphone"></FaIcon>
            ) : (
              <FaIcon className="fas fa-microphone-slash"></FaIcon>
            )}
          </div>
          Audio
        </CameraButton>
      </Left>
      <Center>
        <ChatButton
          onClick={clickChat}
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            <FaIcon className="fas fa-comments"></FaIcon>
          </div>
          Chat
        </ChatButton>

        <ScreenButton
          onClick={clickScreenSharing}
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            <FaIcon
              className={`fas fa-desktop ${screenShare ? "sharing" : ""}`}
            ></FaIcon>
          </div>
          Share Screen
        </ScreenButton>
        <ScreenButton
          onClick={() => dispatch(showCode())}
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            <FaIcon className={`fa fa-code`}></FaIcon>
          </div>
          Code
        </ScreenButton>
        <ScreenButton
          onClick={() => dispatch(showUsers())}
          className="d-flex flex-column align-items-center me-3"
        >
          <div>
            <FaIcon className={`fa fa-users`}></FaIcon>
          </div>
          Users
        </ScreenButton>
      </Center>
      <Right>
        <StopButton
          onClick={goToBack}
          className="d-flex flex-column align-items-center me-3"
        >
          Stop
        </StopButton>
      </Right>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;
const Left = styled.div`
  display: flex;
  align-items: center;

  margin-left: 15px;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background: rgba(222, 221, 221, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background: rgba(222, 221, 221, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: #ee2560;
  border-radius: 15px;

  :hover {
    background: rgba(222, 221, 221, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background: rgba(222, 221, 221, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

const SwitchMenu = styled.div`
  display: flex;
  position: absolute;
  width: 20px;
  top: 7px;
  left: 80px;
  z-index: 1;

  :hover {
    background: rgba(222, 221, 221, 0.12);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.9px);
    -webkit-backdrop-filter: blur(7.9px);
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  > i {
    width: 90%;
    font-size: calc(10px + 1vmin);
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background: rgba(222, 221, 221, 0.12);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(7.9px);
      -webkit-backdrop-filter: blur(7.9px);
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

export default BottomBar;
