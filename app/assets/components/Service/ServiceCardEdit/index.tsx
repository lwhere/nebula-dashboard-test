import React from 'react';
import { Button, Form, Popover } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { IDispatch, IRootState } from '@assets/store';
import { connect } from 'react-redux';
import { TIME_INTERVAL_OPTIONS } from '@assets/utils/dashboard';
import { SERVICE_SUPPORT_METRICS } from '@assets/utils/promQL';
import Icon from '@assets/components/Icon';
import { cloneDeep } from 'lodash';
import intl from 'react-intl-universal';
import { DashboardSelect, Option } from '@assets/components/DashboardSelect';

import './index.less';

const mapState = (state: IRootState) => {
  return {
    servicePanelConfig: state.service.servicePanelConfig
  };
};

const mapDispatch = (dispatch: IDispatch) => {
  return {
    updatePanelConfig: (values) => dispatch.service.update({
      servicePanelConfig: values
    }),
  };
};


interface IProps extends ReturnType<typeof mapState>, 
  ReturnType<typeof mapDispatch> {
  editType: string,
  editIndex: number,
  onClose: () => void;
}

class ServiceCardEdit extends React.Component<IProps> {
  formRef = React.createRef<FormInstance>();
  handleUpdateMetricType = (value: string) => {
    const { editType } = this.props;
    const metricTypeList = SERVICE_SUPPORT_METRICS[editType].filter(item => item.metric === value)[0].metricType;
    this.formRef.current!.setFieldsValue({
      metricFunction: metricTypeList[0].value
    });
  }
  handlePanelConfigUpdate = (values: any) => {
    const { period, metric, metricFunction } = values;
    const { editType, servicePanelConfig, editIndex } = this.props;
    const metricTypeList = SERVICE_SUPPORT_METRICS[editType].filter(item => item.metric === metric)[0].metricType;
    const metricType = metricTypeList.filter(type => type.value === metricFunction)[0].key;
    const _config = cloneDeep(servicePanelConfig);
    _config[editType][editIndex] = {
      period,
      metric,
      metricFunction,
      metricType
    };
    this.props.updatePanelConfig(_config);
    localStorage.setItem('servicePanelConfig', JSON.stringify(_config));
    this.props.onClose();
  }
  render() {
    const { editIndex, editType, servicePanelConfig, onClose } = this.props;
    const editItem = servicePanelConfig[editType][editIndex];
    return (
      <div className="service-card-edit">
        <Form
          ref={this.formRef}
          initialValues={editItem} 
          onFinish={this.handlePanelConfigUpdate}
        >
          <Form.Item label={intl.get('service.period')} name="period">
            <DashboardSelect>
              {
                TIME_INTERVAL_OPTIONS.map(value => (
                  <Option key={value} value={value}>{value}</Option>
                ))
              }
            </DashboardSelect>
          </Form.Item>
          <Popover content="metric docs">
            <Icon className="metric-info-icon blue" icon="#iconnav-serverInfo" />
          </Popover>
          <Form.Item label={intl.get('service.metric')} name="metric">
            <DashboardSelect onChange={this.handleUpdateMetricType}>
              {
                SERVICE_SUPPORT_METRICS[editType].map(metric => (
                  <Option key={metric.metric} value={metric.metric}>{metric.metric}</Option>
                ))
              }
            </DashboardSelect>
          </Form.Item>

          <Form.Item
            noStyle={true}
            shouldUpdate={(prevValues, currentValues) => prevValues.metric !== currentValues.metric}
          >
            {({ getFieldValue }) => {
              const metric = getFieldValue('metric');
              const typeList = SERVICE_SUPPORT_METRICS[editType].filter(item => item.metric === metric)[0].metricType;
              return getFieldValue('metric') ? <Form.Item label={intl.get('service.metricParams')} name="metricFunction">
                <DashboardSelect>
                  {
                    typeList.map(params => (
                      <Option key={params.key} value={params.value}>{params.key}</Option>
                    ))
                  }
                </DashboardSelect>
              </Form.Item> : null;}
            }
          </Form.Item>
          <div className="footer-btns">
            <Button htmlType="button" onClick={onClose}>
              {intl.get('common.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {intl.get('common.confirm')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(ServiceCardEdit);