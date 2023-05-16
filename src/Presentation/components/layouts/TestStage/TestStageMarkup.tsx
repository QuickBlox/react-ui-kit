import React, { useEffect } from 'react';
import './TestStageMarkup.scss';
import ColumnContainer from '../../containers/ColumnContainer/ColumnContainer';
import HeaderDialogs from '../../UI/Dialogs/HeaderDialogs/HeaderDialogs';
import { IconTheme } from '../../UI/svgs/Icons/IconsCommonTypes';
import Search from '../../UI/svgs/Icons/Navigation/Search';
import More from '../../UI/svgs/Icons/Navigation/More';
import Settings from '../../UI/svgs/Icons/Navigation/Settings';
import SettingsField from '../../UI/svgs/Icons/Navigation/SettingsField';
import Close from '../../UI/svgs/Icons/Navigation/Close';
import Back from '../../UI/svgs/Icons/Navigation/Back';
import Plus from '../../UI/svgs/Icons/Navigation/Plus';
import Leave from '../../UI/svgs/Icons/Navigation/Leave';
import Down from '../../UI/svgs/Icons/Navigation/Down';
import ArrowLeft from '../../UI/svgs/Icons/Navigation/ArrowLeft';
import ArrowRight from '../../UI/svgs/Icons/Navigation/ArrowRight';
import Refresh from '../../UI/svgs/Icons/Navigation/Refresh';
import Next from '../../UI/svgs/Icons/Navigation/Next';

import NewChat from '../../UI/svgs/Icons/Actions/NewChat';
import AddContact from '../../UI/svgs/Icons/Actions/AddContact';
import Download from '../../UI/svgs/Icons/Actions/Download';
import Share from '../../UI/svgs/Icons/Actions/Share';
import Archive from '../../UI/svgs/Icons/Actions/Archive';
import Unarchive from '../../UI/svgs/Icons/Actions/Unarchive';
import Send from '../../UI/svgs/Icons/Actions/Send';
import Voice from '../../UI/svgs/Icons/Actions/Voice';
import Emoji from '../../UI/svgs/Icons/Actions/Emoji';
import Edit from '../../UI/svgs/Icons/Actions/Edit';
import ReplyFilled from '../../UI/svgs/Icons/Actions/ReplyFilled';
import ForwardFilled from '../../UI/svgs/Icons/Actions/ForwardFilled';
import SwapCamera from '../../UI/svgs/Icons/Actions/SwapCamera';
import Phone from '../../UI/svgs/Icons/Actions/Phone';
import PhoneFilled from '../../UI/svgs/Icons/Actions/PhoneFilled';
import OutcomeCall from '../../UI/svgs/Icons/Actions/OutcomeCall';
import IncomeCall from '../../UI/svgs/Icons/Actions/IncomeCall';
import Hungup from '../../UI/svgs/Icons/Actions/Hungup';
import VideoIcon from '../../UI/svgs/Icons/Actions/VideoIcon';
import Remove from '../../UI/svgs/Icons/Actions/Remove';
import Remove2 from '../../UI/svgs/Icons/Actions/Remove2';
import Like from '../../UI/svgs/Icons/Actions/Like';
import Copy from '../../UI/svgs/Icons/Actions/Copy';
import Delete from '../../UI/svgs/Icons/Actions/Delete';
import Add from '../../UI/svgs/Icons/Actions/Add';
import Chat from '../../UI/svgs/Icons/Contents/Chat';
import ChatFilled from '../../UI/svgs/Icons/Contents/ChatFilled';
import PrivateChat from '../../UI/svgs/Icons/Contents/PrivateChat';
import GroupChat from '../../UI/svgs/Icons/Contents/GroupChat';
import Notifications from '../../UI/svgs/Icons/Contents/Notifications';
import PublicChannel from '../../UI/svgs/Icons/Contents/PublicChannel';
import Broadcast from '../../UI/svgs/Icons/Contents/Brodcast';
import Stream from '../../UI/svgs/Icons/Contents/Stream';
import StreamFilled from '../../UI/svgs/Icons/Contents/StreamFilled';
import User from '../../UI/svgs/Icons/Contents/User';
import Conference from '../../UI/svgs/Icons/Contents/Conference';
import Contact from '../../UI/svgs/Icons/Contents/Contact';
import ContactFilled from '../../UI/svgs/Icons/Contents/ContactFilled';
import Attachment from '../../UI/svgs/Icons/Media/Attachment';
import Location from '../../UI/svgs/Icons/Media/Location';
import ImageFile from '../../UI/svgs/Icons/Media/ImageFile';
import ImageFilled from '../../UI/svgs/Icons/Media/ImageFilled';
import TextDocument from '../../UI/svgs/Icons/Media/TextDocument';
import AudioFile from '../../UI/svgs/Icons/Media/AudioFile';
import VideoFile from '../../UI/svgs/Icons/Media/VideoFile';
import GifFile from '../../UI/svgs/Icons/Media/GifFile';
import BrokenFile from '../../UI/svgs/Icons/Media/BrokenFile';
import Camera from '../../UI/svgs/Icons/Media/Camera';
import LinkWeb from '../../UI/svgs/Icons/Media/LinkWeb';
import ViewedDelivered from '../../UI/svgs/Icons/Status/ViewedDelivered';
import Sent from '../../UI/svgs/Icons/Status/Sent';
import Help from '../../UI/svgs/Icons/Status/Help';
import Information from '../../UI/svgs/Icons/Status/Information';
import Error from '../../UI/svgs/Icons/Status/Error';
import Loader from '../../UI/svgs/Icons/Status/Loader';
import Mention from '../../UI/svgs/Icons/Status/Mention';
import MicOn from '../../UI/svgs/Icons/Toggle/MicOn';
import MicOff from '../../UI/svgs/Icons/Toggle/MicOff';
import CameraOn from '../../UI/svgs/Icons/Toggle/CameraOn';
import CameraOff from '../../UI/svgs/Icons/Toggle/CameraOff';
import Favourite from '../../UI/svgs/Icons/Toggle/Favourite';
import FavouriteFilled from '../../UI/svgs/Icons/Toggle/FavouriteFilled';
import NotifyOn from '../../UI/svgs/Icons/Toggle/NotifyOn';
import NotifyOff from '../../UI/svgs/Icons/Toggle/NotifyOff';
import CheckOn from '../../UI/svgs/Icons/Toggle/CheckOn';
import CheckOff from '../../UI/svgs/Icons/Toggle/CheckOff';
import FullScreen from '../../UI/svgs/Icons/Toggle/FullScreen/inex';
import Minimize from '../../UI/svgs/Icons/Toggle/Minimize';
import ImagePlay from '../../UI/svgs/Icons/Toggle/ImagePlay';
import Pause from '../../UI/svgs/Icons/Toggle/Pause';
import Record from '../../UI/svgs/Icons/Toggle/Record';
import StopRecord from '../../UI/svgs/Icons/Toggle/StopRecord';
import Speaker from '../../UI/svgs/Icons/Toggle/Speaker';
import SpeakerOff from '../../UI/svgs/Icons/Toggle/SpeakerOff';
import Quite from '../../UI/svgs/Icons/Toggle/Quite';
import ScreenShare from '../../UI/svgs/Icons/Toggle/Screenshare';
import StopShare from '../../UI/svgs/Icons/Toggle/StopShare';
import Show from '../../UI/svgs/Icons/Toggle/Show';
import Hide from '../../UI/svgs/Icons/Toggle/Hide';
import Admin from '../../UI/svgs/Icons/Moderation/Admin';
import Moderations from '../../UI/svgs/Icons/Moderation/Moderations';
import Banned from '../../UI/svgs/Icons/Moderation/Banned';
import Muted from '../../UI/svgs/Icons/Moderation/Muted';
import Freeze from '../../UI/svgs/Icons/Moderation/Freeze';
import ImageEmpty from '../../UI/svgs/Icons/Media/ImageEmpty';
import { ModalContext } from '../../providers/ModalContextProvider/Modal';
import PreviewDialog from '../../UI/Dialogs/PreviewDialog/PreviewDialog';
import { DialogType } from '../../../../Domain/entity/DialogTypes';

import imageName from '../../../assets/img/bee-img.png';
import PreviewDialogViewModel from '../../UI/Dialogs/PreviewDialog/PreviewDialogViewModel';
import BaseViewModel from '../../../Views/Base/BaseViewModel';
import { Stubs } from '../../../../Data/Stubs';
import imageSelfie from '../../../assets/img/Artem_Koltunov_Selfi.png';
import DarkTheme from '../../../assets/DarkTheme';
import LoaderComponent from '../../UI/Placeholders/LoaderComponent/LoaderComponent';
import ErrorComponent from '../../UI/Placeholders/ErrorComponent/ErrorComponent';
import SwitchButton from '../../UI/Elements/SwitchButton/SwitchButton';
import { DialogEntity } from '../../../../Domain/entity/DialogEntity';
import MainButton, { TypeButton } from '../../UI/Buttons/MainButton/MainButton';

function TestStageMarkup() {
  const { handleModal } = React.useContext(ModalContext);
  const theme1: IconTheme = { color: '#6c38cc', width: '34', height: '34' };
  const loaderTheme: IconTheme = {
    color: '#FF3B30',
    width: '42',
    height: '42',
  };

  const closeModal = () => {
    console.log('closeModal');
    handleModal(false, '');
  };

  const defEntity = Stubs.createDialogEntityByTypeWithDefaultValues(
    DialogType.group,
  );

  const viewModel: PreviewDialogViewModel = new PreviewDialogViewModel(
    (it) => {
      console.log(`list item click ${it.entity.name || ''}`);
    },
    (it) => {
      console.log(`list item touch ${it.entity.name || ''}`);
    },
    // -1,
    // 'test item',
    defEntity,
  );

  const [selectedDialog, setSelectedDialog] =
    React.useState<BaseViewModel<DialogEntity>>(viewModel);

  const dialogs: PreviewDialogViewModel[] = [
    new PreviewDialogViewModel(
      (it) => {
        console.log(`list item click ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      (it) => {
        console.log(`list item touch ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      // 0,
      // 'item 0',
      defEntity,
    ),
    new PreviewDialogViewModel(
      (it) => {
        console.log(`list item click ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      (it) => {
        console.log(`list item touch ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      // 1,
      // 'item 1',
      defEntity,
    ),
    new PreviewDialogViewModel(
      (it) => {
        console.log(`list item click ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      (it) => {
        console.log(`list item touch ${it.entity.name || ''}`);
        setSelectedDialog(it);
      },
      // 2,
      // 'item 2',
      defEntity,
    ),
  ];

  const [dialogsList, setDialogsList] = React.useState(dialogs);

  const [themeName, setThemeName] = React.useState(
    document.documentElement.getAttribute('data-theme'),
  );

  function changeThemeActions() {
    console.log('Theme has changed.');
    setThemeName(document.documentElement.getAttribute('data-theme'));
    setDialogsList(dialogs);
  }

  useEffect(() => {
    changeThemeActions();
  }, [document.documentElement.getAttribute('data-theme')]);

  return (
    <div className="container-test-stage">
      <div className="container-test-stage__item">
        <ColumnContainer>
          <HeaderDialogs />
          <HeaderDialogs title="Dialog 2" />
          <HeaderDialogs title="1234567890123456789012345678901234567890" />
          <PreviewDialog
            typeDialog={DialogType.public}
            title="Public"
            message_date_time_sent="now"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />

          <PreviewDialog
            typeDialog={DialogType.group}
            dialogViewModel={viewModel}
            theme={{ selected: true, muted: true }}
            title="Dialog with states"
            unreadMessageCount={9}
            message_date_time_sent="5 min ago"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />
          {dialogsList.map((item, index) => (
            <div
              onClick={() => {
                const newData = [...dialogs];

                newData[index].isSelected = true;
                setDialogsList(newData);
              }}
            >
              <PreviewDialog
                typeDialog={DialogType.group}
                dialogViewModel={item}
                theme={{
                  themeName: themeName === 'dark' ? 'dark' : 'light',
                  selected: item.isSelected,
                  muted: true,
                }}
                title={`${item.entity.name || ''} ${
                  item.isSelected ? `selected ${themeName || ''}` : ''
                }`}
                unreadMessageCount={index > 0 ? index : undefined}
                message_date_time_sent={`${new Date().toLocaleTimeString()}`}
                previewMessage={
                  '                I am not even going to pretend to understand what you are\n' +
                  '                talking about.'
                }
              />
            </div>
          ))}
          <PreviewDialog
            typeDialog={DialogType.private}
            title="1234567890123456789012345678901234567890"
            message_date_time_sent="09:03"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />
          <PreviewDialog
            typeDialog={DialogType.private}
            dialogAvatar={
              <img
                style={{ width: '55px', height: '55px', borderRadius: '50%' }}
                src={imageName}
              />
            }
            theme={{
              selected: false,
              muted: false,
              colorTheme: new DarkTheme(),
              themeName: 'custom',
            }}
            title="Name"
            message_date_time_sent="07:22"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />
          <PreviewDialog
            typeDialog={DialogType.private}
            title="Name"
            message_date_time_sent="Yesterday"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />
          <PreviewDialog
            typeDialog={DialogType.private}
            dialogAvatar={
              <img
                style={{ width: '55px', height: '55px', borderRadius: '50%' }}
                src={imageSelfie}
              />
            }
            title="Name"
            message_date_time_sent="07:22"
            previewMessage={
              '                I am not even going to pretend to understand what you are\n' +
              '                talking about.'
            }
          />
        </ColumnContainer>
      </div>
      <div className="container-test-stage__item">
        <h1>Test Icons</h1>

        <div className="container-test-stage--content-wrapper">
          <h3>Navigation</h3>
          <strong>Default</strong>

          <Search />
          <More />
          <Settings />
          <SettingsField />
          <Plus />
          <Leave />
          <Close />
          <Back />
          <Next />
          <Down />
          <ArrowLeft />
          <ArrowRight />
          <Refresh />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Navigation</h3>
          <strong>With Themes</strong>
          <br />
          <Search
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <More
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Settings
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <SettingsField
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Plus
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Leave
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Close
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Back
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Next
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Down
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ArrowLeft
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ArrowRight
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Refresh
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Actions</h3>
          <strong>default</strong>
          <br />
          <Add />
          <AddContact />
          <NewChat />
          <Delete />
          <Download />
          <Share />
          <Archive />
          <Unarchive />
          <Send />
          <Voice />
          <Emoji />
          <Edit />
          <ReplyFilled />
          <ForwardFilled />
          <Copy />
          <SwapCamera />
          <Phone />
          <PhoneFilled />
          <OutcomeCall />
          <IncomeCall />
          <Hungup />
          <VideoIcon />
          <Remove />
          <Remove2 />
          <Like />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Actions</h3>
          <strong>with themes</strong>
          <br />
          <Add
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <AddContact
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <NewChat
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Delete
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Download
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Share
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Archive
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Unarchive
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Send
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Voice
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Emoji
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Edit
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ReplyFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ForwardFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Copy
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <SwapCamera
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Phone
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <PhoneFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <OutcomeCall
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <IncomeCall
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Hungup
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <VideoIcon
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Remove
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Remove2
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Like
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Contents</h3>
          <strong>default</strong>
          <br />
          <Chat />
          <ChatFilled />
          <PrivateChat />
          <GroupChat />
          <Notifications />
          <PublicChannel />
          <Broadcast />
          <Stream />
          <StreamFilled />
          <User />
          <Conference />
          <Contact />
          <ContactFilled />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Contents</h3>
          <strong>with themes</strong>
          <br />
          <Chat
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ChatFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <PrivateChat
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <GroupChat
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Notifications
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <PublicChannel
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Broadcast
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Stream
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <StreamFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <User
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Conference
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Contact
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ContactFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Media</h3>
          <strong>default</strong>
          <br />
          <Attachment />
          <LinkWeb />
          <Location />
          <Camera />
          <ImageFile />
          <ImageEmpty />
          <ImageFilled />
          <TextDocument />
          <AudioFile />
          <VideoFile />
          <GifFile />
          <BrokenFile />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Media</h3>
          <strong>with themes</strong>
          <br />
          <Attachment
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <LinkWeb
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Location
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Camera
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ImageFile
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ImageEmpty
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ImageFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <TextDocument
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <AudioFile
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <VideoFile
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <GifFile
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <BrokenFile
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Status</h3>
          <strong>default</strong>
          <br />
          <Sent />
          <ViewedDelivered />
          <Information />
          <Help />
          <Error />
          <Mention />
          <Loader />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Status</h3>
          <strong>with themes</strong>
          <br />
          <Sent
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ViewedDelivered
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Information
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Help
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Error
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Mention
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Loader
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Toggle</h3>
          <strong>default</strong>
          <br />
          <MicOn />
          <MicOff />
          <CameraOn />
          <CameraOff />
          <Favourite />
          <FavouriteFilled />
          <Show />
          <Hide />
          <NotifyOn />
          <NotifyOff />
          <CheckOn />
          <CheckOff />
          <FullScreen />
          <Minimize />
          <ImagePlay />
          <Pause />
          <Record />
          <StopRecord />
          <Speaker />
          <SpeakerOff />
          <Quite />
          <Loader />
          <ScreenShare />
          <StopShare />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Toggle</h3>
          <strong>with themes</strong>
          <br />
          <MicOn
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <MicOff
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <CameraOn
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <CameraOff
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Favourite
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <FavouriteFilled
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Show
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Hide
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <NotifyOn
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <NotifyOff
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <CheckOn
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <CheckOff
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <FullScreen
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Minimize
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ImagePlay
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Pause
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Record
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <StopRecord
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Speaker
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <SpeakerOff
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Quite
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Loader
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <ScreenShare
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <StopShare
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Moderation</h3>
          <strong>default</strong>
          <br />
          <Admin />
          <Moderations />
          <Banned />
          <Muted />
          <Freeze />
        </div>

        <div className="container-test-stage--content-wrapper">
          <hr />
          <h3>Moderation</h3>
          <strong>with themes</strong>
          <br />
          <Admin
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Moderations
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Banned
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Muted
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
          <Freeze
            color={theme1.color}
            width={theme1.width}
            height={theme1.height}
          />
        </div>
      </div>
      <div className="container-test-stage__item">
        <LoaderComponent
          width={loaderTheme.width}
          height={loaderTheme.height}
          color={loaderTheme.color}
        />
        <LoaderComponent />
        <hr />
        <ErrorComponent
          title="Something is wrong!!!"
          theme={theme1}
          ClickActionHandler={() => {
            alert('call click retry');
          }}
        />
        <hr />
        <ErrorComponent
          title="Something is wrong!!!"
          ClickActionHandler={() => {
            alert('call click retry');
          }}
        />
        <hr />
        <SwitchButton />
        <hr />
        Selected dialog name: {selectedDialog.entity.name}
        <br />
        Selected dialog id: {selectedDialog.entity.id}
        <hr />
        <br />
        <MainButton
          title="Test"
          styleBox={{
            width: '100px',
            color: 'green',
            background: 'var(--color-background)',
          }}
        />
        <br />
        <MainButton title="Default" typeButton={TypeButton.default} />
        <br />
        <MainButton title="Danger" typeButton={TypeButton.danger} />
        <br />
        <MainButton title="Outlined" typeButton={TypeButton.outlined} />
      </div>
      <div className="container-test-stage__item">
        <ColumnContainer>
          Theme switcher
          <button
            onClick={() => {
              console.log('clicked theme');
              document.documentElement.setAttribute('data-theme', 'dark');
              changeThemeActions();
            }}
            type="button"
          >
            SWITCH THEME
          </button>
          Modal window tester
          <button
            onClick={() => {
              handleModal(
                true,
                <ColumnContainer gapBetweenItem="8px">
                  <ErrorComponent
                    title="Something is wrong!!!"
                    theme={theme1}
                    ClickActionHandler={() => {
                      alert('clicked on error message');
                      closeModal();
                    }}
                  />
                </ColumnContainer>,
                'Modal window test title',
                false,
                true,
              );
            }}
            type="button"
          >
            SHOW ME
          </button>
        </ColumnContainer>
      </div>
      <div className="container-test-stage__item" />
    </div>
  );
}

export default TestStageMarkup;
