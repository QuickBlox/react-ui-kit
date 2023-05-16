import EventMessagesRepository from '../../../../Data/repository/EventMessagesRepository';
import useQbDataContext from './useQbDataContext';

const useEventMessagesRepository = (): EventMessagesRepository => {
  const currentQbDataContext = useQbDataContext();

  return currentQbDataContext.storage.EVENT_MESSAGE_REPOSITORY;
};

export default useEventMessagesRepository;
