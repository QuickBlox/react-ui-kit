import { AIChatHistory, AIAnswerResponse } from 'quickblox';
import { RemoteDialogDTO } from '../../dto/dialog/RemoteDialogDTO';
import { RemoteDialogsDTO } from '../../dto/dialog/RemoteDialogsDTO';
import { RemoteUserDTO } from '../../dto/user/RemoteUserDTO';
import { RemoteUsersDTO } from '../../dto/user/RemoteUsersDTO';
import { RemoteMessagesDTO } from '../../dto/message/RemoteMessagesDTO';
import { RemoteMessageDTO } from '../../dto/message/RemoteMessageDTO';
import { RemoteFileDTO } from '../../dto/file/RemoteFileDTO';
import { Pagination } from '../../../Domain/repository/Pagination';
import { CallBackFunction } from '../../../Domain/use_cases/base/IUseCase';
import { NotificationTypes } from '../../../Domain/entity/NotificationTypes';
import { QBUIKitConfig } from '../../../CommonTypes/CommonTypes';
// todo list of all actions - for what we need to create tests
/*
 0!!! не реализованы эксепшены для createDialog RemouteDataSource и
 и нет обрадотки эксепшенов для DTO и Mapper
 + 1. UML диаграмы сравнить и синхронизировать
 + 2. Синхронизировать сигнатуры методов в интерфейсах и реализациях
 + 3. Изменить все методы Promise<boolean> на Promise<void>
 4. Прверить, что Not Found exception переименован в Not Found Item exception
 4.1 и эксепшен Not Found Item exception генерируют только методы для одной энтити -одного элемента
 списки возвращают пустую коллекцию
 5. Доделіваем DialogList = полцчение одного диалога, получение диалогов из Ремутедатасоурсе
 6. Передалать DialogList = полцчение одного диалога, получение диалогов из Локаладатасоурсе
 Вернуть радотоспособность тестам других репозиториев, что уже есть
 ======================
 Refactoring DTO for RemoteDS using RemoteDialogDTO as example
 create DTO for localDS - in separate branche for LocalDS
 изменить типы в мапперах в DTO (QB=>DTO)
 создать новый маппер внутри соурса под именем IDTOMapper c двумя методами
 Переделать
     тесты
     RemoteDS
     DialogRepository
  Нужны тесты для мапперов
 */
export interface IRemoteMessaging<TArg> {
  subscribeOnSystemMessaging(
    notificationType: NotificationTypes,
    callback: CallBackFunction<TArg>,
  ): void;

  subscribeOnMessaging(callback: CallBackFunction<TArg>): void;

  releaseSubscriptions(): void;
}
export interface IRemoteDataSource extends IRemoteMessaging<RemoteMessageDTO> {
  /*
  позитивный тест на результат - нет эксепшена и тот диалог, который вернули, можем найти
  по id и среди списка всех
  тест на эксепшн = негативный тест на результат - это эксепшен некорректные данные
  эксепшны с диаграмы: коннекш фейлд, нет авторизации, запрещен доступ, некоректные данные
   */
  createDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
  /*
  негативный тест - нет такого диалога
  */
  updateDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
  /*
  негативный тест экспшн
  Как сигнализуирем, что нет такого диалога по id - эксепшеном или пустым объектом?
  проверить, что договаривались, на эксепшн НотФаунд
  Позитивный тест - нет эксепшена и вернули значение
   */
  getDialog(dto: RemoteDialogDTO): Promise<RemoteDialogDTO>;
  /*
   негативный тест - пытаемся удалить того, которого нет - эксепшн некоректные данные
   позитивный тест - удалили без экспепшена тот. что был и после удаления такого нет
   ни по id ни при получении списком
    */

  getDialogs(pagination?: Pagination): Promise<RemoteDialogsDTO>;

  deleteDialog(dto: RemoteDialogDTO): Promise<void>;

  deleteUsersFromDialog(
    dialogDto: RemoteDialogDTO,
    usersDTO: Array<RemoteUserDTO>,
  ): Promise<void>;

  getUser(dto: RemoteUserDTO): Promise<RemoteUserDTO>;

  getUsers(dto: RemoteUsersDTO): Promise<RemoteUsersDTO>;

  getMessages(
    dialogId: string,
    pagination: Pagination,
  ): Promise<RemoteMessagesDTO>;

  typingMessageStart(
    dialogDTO: RemoteDialogDTO,
    senderId: number,
  ): Promise<void>;
  typingMessageStop(
    dialogDTO: RemoteDialogDTO,
    senderId: number,
  ): Promise<void>;

  sendMessage(dto: RemoteMessageDTO): Promise<RemoteMessageDTO>;

  sendSystemMessage(dto: RemoteMessageDTO): Promise<boolean>;

  updateMessage(dto: RemoteMessageDTO): Promise<RemoteMessageDTO>;

  deleteMessage(dto: RemoteMessageDTO): Promise<void>;

  createFile(dto: RemoteFileDTO): Promise<RemoteFileDTO>;

  getFile(dto: RemoteFileDTO): Promise<RemoteFileDTO>;

  deleteFile(dto: RemoteFileDTO): Promise<void>;

  subscribeToChatConnectionEvents(fileId: string): Promise<void>;

  updateCurrentDialog(dto: RemoteDialogDTO, qbConfig: QBUIKitConfig): void;

  createAnswer(
    text: string,
    messages: AIChatHistory,
    smartChatAssistantId: string,
  ): Promise<AIAnswerResponse>;

  translate(
    text: string,
    languageCode: string,
    smartChatAssistantId: string,
  ): Promise<AIAnswerResponse>;
}
