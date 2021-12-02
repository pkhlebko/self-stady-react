import {actionTypes} from '../store';

export interface ActionModel {
  type: actionTypes;
  payload: ActionPayloadModel;
}

export interface ActionPayloadModel {
  [key: string]: any;
}
