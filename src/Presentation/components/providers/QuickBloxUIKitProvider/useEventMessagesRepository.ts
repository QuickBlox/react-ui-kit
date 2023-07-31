import EventMessagesRepository from '../../../../Data/repository/EventMessagesRepository';
import useQbInitializedDataContext from './useQbInitializedDataContext';

const useEventMessagesRepository = (): EventMessagesRepository => {
  const currentQbDataContext = useQbInitializedDataContext();

  return currentQbDataContext.storage.EVENT_MESSAGE_REPOSITORY;
};

export default useEventMessagesRepository;
