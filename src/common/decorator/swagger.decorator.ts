import { PageResDto } from './../page-dto';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

export const ApiGetResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};

export const ApiPostResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};

export const ApiGetItemsResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageResDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
            required: ['items'],
          },
        ],
      },
    }),
  );
};
