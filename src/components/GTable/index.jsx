import React, { useEffect, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/*
  eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["formRef","el"] }]
  */
const GTable = ({ request, search, columns = [], formRef, pagination, ...rest }) => {
  let newSearch = false;
  const tableFormRef = useRef();

  // 传参给外部的ref
  useEffect(() => {
    if (formRef) {

      formRef.current = { ...tableFormRef.current };
    }
  }, [])


  const newCloumns = columns.map(el => {
    // 金额右对齐设置
    if (el.valueType === 'money') {
      el.align = el.align || 'right';
    }

    // 添加enter事件
    if (
      (!el.valueType && !el.valueEnum && !el.renderFormItem)
      || (["text", "textarea", "digit"].includes(el.valueType) && el.search !== false)) {
      el.fieldProps = {
        ...el.fieldProps,
        allowClear: true,
        onPressEnter: (e) => {
          e.currentTarget.blur();
          tableFormRef.current.submit();
        }
      }
    }
    return el;
  });

  const defaultSearch = {
    defaultCollapsed: false,
    // collapsed: false,
    // collapseRender: false,
    // span: 6,
    optionRender: ({ searchText, resetText }, { form }) => {
      return [
        <a
          key="resetText"
          onClick={() => {
            form?.resetFields();
            form?.submit();
          }}
        >
          {resetText}
        </a>,
        <Button
          key="searchText"
          type="primary"
          icon={<SearchOutlined />}
          className="ml20"
          onClick={() => {
            form?.submit();
          }}
        >
          {searchText}
        </Button>,
      ];
    },
  };

  if (search !== false) {
    newSearch = {
      ...defaultSearch,
      ...search
    }
  }

  const requestAction = async (params, sorter, filter) => {
    const { data, total } = await request({ ...params, page: params.current, ...filter, ...sorter })
    return { data, total }
  };

  return (
    <ProTable
      formRef={tableFormRef}
      rowKey="id"
      request={pagination !== false ? requestAction : null}
      options={false}
      scroll={{ x: 'max-content' }}
      search={newSearch}
      columns={newCloumns}
      pagination={pagination}
      {...rest}
    />
  );
};

export default GTable;