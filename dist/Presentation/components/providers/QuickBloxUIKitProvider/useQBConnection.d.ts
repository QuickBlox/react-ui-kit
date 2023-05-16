import ConnectionRepository from '../../../../Data/repository/ConnectionRepository';
type QBConnectionInfo = {
    connectionRepository: ConnectionRepository;
    browserOnline: boolean;
};
declare const useQBConnection: () => QBConnectionInfo;
export default useQBConnection;
