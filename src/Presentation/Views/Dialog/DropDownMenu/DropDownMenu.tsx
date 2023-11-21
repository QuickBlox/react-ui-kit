import './DropDownMenu.scss';
import React from 'react';
import { ItemDropDownMenu } from './ItemDropDownMenu/ItemDropDownMenu';
import { FunctionTypeVoidToVoid } from '../../../../CommonTypes/BaseViewModel';
import { MessageEntity } from '../../../../Domain/entity/MessageEntity';
import ForwardFilled from '../../../components/UI/svgs/Icons/Actions/ForwardFilled';

export type ContextMessageMenu = {
  title: string;
  message?: MessageEntity;
  icon?: React.ReactNode;
  clickHandler?: FunctionTypeVoidToVoid;
  touchHandler?: FunctionTypeVoidToVoid;
};
export type ContextMessageMenuAI = {
  title: string;
  message?: MessageEntity;
  icon?: React.ReactNode;
  clickHandler?: FunctionTypeVoidToVoid;
  touchHandler?: FunctionTypeVoidToVoid;
};

export const contextMessageMenu: ContextMessageMenu[] = [
  {
    title: 'Reply',
    // icon: 'ic1',
    clickHandler: () => {
      console.log('click Reply');
    },
  },
  {
    title: 'Forward',
    icon: <ForwardFilled />,
    clickHandler: () => {
      console.log('click Forward');
    },
  },
  {
    title: 'Copy',
    // icon: 'ic2',
    clickHandler: () => {
      console.log('click Copy');
    },
  },
];

export const contextMessageMenuAI: ContextMessageMenuAI[] = [
  // {
  //   title: 'Translate',
  //   // icon: ,
  //   clickHandler: () => {
  //     console.log('click Translate');
  //   },
  // },
  // {
  //   title: 'Answer',
  //   // icon: 'ic2',
  //   clickHandler: () => {
  //     console.log('click Answer');
  //   },
  // },
];

type DropDownMenuProps = {
  items: ContextMessageMenu[];
  // itemsAI?: ContextMessageMenuAI[];
};

// eslint-disable-next-line react/function-component-definition
export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  items,
}: // itemsAI,
DropDownMenuProps) => {
  // console.log(itemsAI);

  return (
    <div className="drop-down-menu2-container">
      {items.map((item, index) => {
        return (
          <ItemDropDownMenu
            key={index}
            item={item.title}
            icon={item.icon}
            clickAction={item.clickHandler}
            touchAction={item.touchHandler}
          />
        );
      })}
      <div className="drop-down-menu2-container--divider" />
      {/* {itemsAI && itemsAI?.length > 0 */}
      {/*  ? itemsAI?.map((itemAI, indexAI) => { */}
      {/*      return ( */}
      {/*        <ItemDropDownMenu */}
      {/*          key={indexAI} */}
      {/*          item={itemAI.title} */}
      {/*          icon={itemAI.icon} */}
      {/*          clickAction={itemAI.clickHandler} */}
      {/*          touchAction={itemAI.touchHandler} */}
      {/*        /> */}
      {/*      ); */}
      {/*    }) */}
      {/*  : null} */}
    </div>
  );
};
