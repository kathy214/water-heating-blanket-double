import React, { useState, useEffect } from 'react';
import { Text, View, Image, Switch } from '@ray-js/ray';
import { NavBar } from '@ray-js/smart-ui';
import { useActions, useProps } from '@ray-js/panel-sdk';
import Res from '@/res';
import Strings from '@/i18n';
import styles from './index.module.less';
import { ErrorPopup } from '@/components/ErrorPopup';
import { ModelPopup } from '@/components/ModelPopup';
import { Slider } from '@/components/Slider';

function getModel(modelVal) {
  if (modelVal === 'hongbei') {
    return Strings.getLang('model4');
  }
  if (modelVal === 'yure') {
    return Strings.getLang('model1');
  }
  if (modelVal === 'chuman') {
    return Strings.getLang('model3');
  }
  if (modelVal === 'shuim') {
    return Strings.getLang('model2');
  }
  return Strings.getLang('model0');
}

export function Home() {
  const dpActions = useActions();
  const switchA = useProps(props => props.switch);
  const tempSetADp = useProps(props => props.temp_set);
  const tempCurrentADp = useProps(props => props.temp_current);
  const countdownA = useProps(props => props.countdown_left_1);
  const timerADp = useProps(props => props.timer_l);
  const modeCurrentA = useProps(props => props.mode_current1);

  const switchB = useProps(props => props.switch_1);
  const tempSetBDp = useProps(props => props.temp_set_1);
  const tempCurrentBDp = useProps(props => props.temp_current_1);
  const countdownB = useProps(props => props.countdown_left_2);
  const timerBDp = useProps(props => props.timer_R);
  const modeCurrentB = useProps(props => props.mode_current2);

  const model = useProps(props => props.mode);
  const childLock = useProps(props => props.child_lock);
  const light = useProps(props => props.light);
  const fault = useProps(props => props.fault);
  const switchNightLight = useProps(props => props.switch_night_light);

  // A区开关
  const handleChangeSwitchA = () => {
    const val = !switchA;
    dpActions.switch.set(val);
  };

  // B区开关
  const handleChangeSwitchB = () => {
    const val = !switchB;
    dpActions.switch_1.set(val);
  };

  // A区温度设置
  const [tempSetA, setTempSetA] = useState(tempSetADp);
  const handlechangingTempSetA = val => {
    setTempSetA(val);
  };

  const handlechangeTempSetA = val => {
    dpActions.temp_set.set(val);
  };
  // B区温度设置
  const [tempSetB, setTempSetB] = useState(tempSetBDp);
  const handlechangingTempSetB = val => {
    setTempSetB(val);
  };
  const handlechangeTempSetB = val => {
    dpActions.temp_set_1.set(val);
  };

  // A区定时设置
  const [timerA, setTimerA] = useState(timerADp);
  const handleChangeingTimerA = val => {
    setTimerA(val);
  };
  const handleChangeTimerA = val => {
    dpActions.timer_l.set(val);
  };

  // B区定时设置
  const [timerB, setTimerB] = useState(timerBDp);
  const handleChangeingTimerB = val => {
    setTimerB(val);
  };
  const handleChangeTimerB = val => {
    dpActions.timer_R.set(val);
  };

  // 模式设置
  const modelList = [
    {
      label: Strings.getLang('model1'),
      value: 'yure',
      icon: Res.warmIcon,
      activeIcon: Res.warmActiveIcon,
    },
    {
      label: Strings.getLang('model2'),
      value: 'shuim',
      icon: Res.sleepIcon,
      activeIcon: Res.sleepActiveIcon,
    },
    {
      label: Strings.getLang('model3'),
      value: 'chuman',
      icon: Res.destroyIcon,
      activeIcon: Res.destoryActiveIcon,
    },
    {
      label: Strings.getLang('model4'),
      value: 'hongbei',
      icon: Res.bakeIcon,
      activeIcon: Res.bakeActiveIcon,
    },
  ];

  const [showModel, setShowModel] = useState(false);

  const [selectModel, setSelectModel] = useState('putong');
  const handleChangeModel = val => {
    if (!switchA && !switchB) return;
    if (val === model) {
      dpActions.mode.set('putong');
      return;
    }
    setSelectModel(val);
    setShowModel(true);
  };
  const confirmChumanModel = () => {
    dpActions.mode.set(selectModel);
    setShowModel(false);
  };
  const cancelChumanModel = () => {
    setShowModel(false);
  };

  // 息屏设置
  const handleChangeLight = () => {
    if (!switchA && !switchB) return;
    const val = !light;
    dpActions.light.set(val);
  };

  // 夜灯设置
  const handleChangeSwitchNightLight = () => {
    if (!switchA && !switchB) return;
    const val = !switchNightLight;
    dpActions.switch_night_light.set(val);
  };

  // 童锁设置
  const handleChangeChildLock = () => {
    if (!switchA && !switchB) return;
    const val = !childLock;
    dpActions.child_lock.set(val);
  };

  const [showError, setShowError] = useState(fault !== 0 && fault !== 256);

  const changeCountdown = (val: number) => {
    if (val >= 60) {
      return `${Math.floor(val / 60)}小时${val % 60}分`;
    }
    return `${val}分`;
  };

  useEffect(() => {
    setTempSetA(tempSetADp);
  }, [tempSetADp]);
  useEffect(() => {
    setTempSetB(tempSetBDp);
  }, [tempSetBDp]);

  useEffect(() => {
    setTimerA(timerADp);
  }, [timerADp]);

  useEffect(() => {
    setTimerB(timerBDp);
  }, [timerBDp]);

  useEffect(() => {
    setShowError(fault !== 0 && fault !== 256);
  }, [fault]);

  return (
    <View className={`${styles.container} ${!switchA && !switchB ? styles.containerDisabled : ''}`}>
      <NavBar
        title={Strings.getLang('titleHome')}
        placeholder
        customStyle={{ backgroundColor: 'transparent' }}
        border={false}
      />
      <View className={styles.gearStatus}>
        <View
          className={`${styles.gearBox} ${!switchA ? styles.gearBoxDisabled : ''}`}
          style={{ marginRight: '4rpx' }}
        >
          <Text className={styles.gearArea}>{Strings.getLang('areaA')}</Text>
          <View className={styles.gearShow}>
            <Text className={styles.gearNum}>{switchA ? tempSetA : '--'}</Text>
            <Text className={styles.gearUnit}>{Strings.getLang('gearUnit')}</Text>
          </View>
        </View>
        <View className={`${styles.gearBox} ${!switchB ? styles.gearBoxDisabled : ''}`}>
          <Text className={styles.gearArea}>{Strings.getLang('areaB')}</Text>
          <View className={styles.gearShow}>
            <Text className={styles.gearNum}>{switchB ? tempSetB : '--'}</Text>
            <Text className={styles.gearUnit}>{Strings.getLang('gearUnit')}</Text>
          </View>
        </View>
      </View>
      <View className={styles.remainingTimeBox}>
        <View className={styles.timeItem} style={{ marginRight: '4rpx' }}>
          <Text className={styles.timeNum}>
            {switchA && countdownA > 0 ? changeCountdown(countdownA) : '--'}
          </Text>
          <Text className={styles.timeText}>
            {Strings.getLang('areaA')}
            {Strings.getLang('remainingTtime')}
          </Text>
        </View>
        <View className={styles.timeItem}>
          <Text className={styles.timeNum}>
            {switchB && countdownB > 0 ? changeCountdown(countdownB) : '--'}
          </Text>
          <Text className={styles.timeText}>
            {Strings.getLang('areaB')}
            {Strings.getLang('remainingTtime')}
          </Text>
        </View>
      </View>
      <View className={styles.modelShow}>
        <View className={`${styles.modelShowBox} ${!switchA && styles.modelShowBoxDisabled}`}>
          <Text className={styles.modelText}>
            {getModel(modeCurrentA)} {Strings.getLang('model')}
          </Text>
        </View>
        <View className={`${styles.modelShowBox} ${!switchB && styles.modelShowBoxDisabled}`}>
          <Text className={styles.modelText}>
            {getModel(modeCurrentB)}
            {Strings.getLang('model')}
          </Text>
        </View>
      </View>

      <View className={styles.card} style={{ marginTop: '46rpx' }}>
        {childLock && (switchA || switchB) && <View className={styles.lockMask} />}
        <View className={styles.switch}>
          <View className={styles.switchBox} onClick={handleChangeSwitchA}>
            <Image
              className={styles.switchIcon}
              src={switchA ? Res.switchActiveIcon : Res.switchIcon}
            />
            <Text className={styles.switchName}>
              {Strings.getLang('areaA')}
              {switchA ? Strings.getLang('shutdown') : Strings.getLang('powerOn')}
            </Text>
          </View>
          <View className={styles.cardLine} />
          <View className={styles.switchBox} onClick={handleChangeSwitchB}>
            <Image
              className={styles.switchIcon}
              src={switchB ? Res.switchActiveIcon : Res.switchIcon}
            />
            <Text className={styles.switchName}>
              {Strings.getLang('areaB')}
              {switchB ? Strings.getLang('shutdown') : Strings.getLang('powerOn')}
            </Text>
          </View>
        </View>
      </View>
      <View className={styles.card}>
        {childLock && (switchA || switchB) && <View className={styles.lockMask} />}

        <View className={styles.gearSet}>
          <View className={styles.cardTitle}>{Strings.getLang('gearSet')}</View>

          <Slider
            disabled={!switchA}
            area={Strings.getLang('areaA')}
            unit={Strings.getLang('gearUnit')}
            value={switchA ? tempSetA : 20}
            min={20}
            max={65}
            step={1}
            onChanging={handlechangingTempSetA}
            onChange={handlechangeTempSetA}
          />
          <View style={{ marginTop: '54rpx' }}>
            <Slider
              disabled={!switchB}
              area={Strings.getLang('areaB')}
              unit={Strings.getLang('gearUnit')}
              value={switchB ? tempSetB : 20}
              min={20}
              max={65}
              step={1}
              onChanging={handlechangingTempSetB}
              onChange={handlechangeTempSetB}
            />
          </View>
        </View>
      </View>
      <View className={styles.card}>
        {childLock && (switchA || switchB) && <View className={styles.lockMask} />}

        <View className={styles.gearSet}>
          <View className={styles.cardTitle}>{Strings.getLang('timeSet')}</View>
          <Slider
            disabled={!switchA}
            area={Strings.getLang('areaA')}
            unit="H"
            value={switchA ? timerA : 0}
            min={0}
            max={15}
            step={1}
            onChanging={handleChangeingTimerA}
            onChange={handleChangeTimerA}
          />
          <View style={{ marginTop: '54rpx' }}>
            <Slider
              disabled={!switchB}
              area={Strings.getLang('areaB')}
              unit="H"
              value={switchB ? timerB : 0}
              min={0}
              max={15}
              step={1}
              onChanging={handleChangeingTimerB}
              onChange={handleChangeTimerB}
            />
          </View>
        </View>
      </View>
      <View className={styles.card}>
        {childLock && (switchA || switchB) && <View className={styles.lockMask} />}

        <View className={styles.gearSet}>
          <View className={styles.gearItem}>
            <View className={styles.gearLabel}>
              <Text className={styles.gearName}>{Strings.getLang('sceneMode')}</Text>
            </View>
            <View className={styles.sceneModelList}>
              {modelList.map(item => (
                <View
                  className={styles.sceneModeItem}
                  onClick={() => handleChangeModel(item.value)}
                  key={item.value}
                >
                  <Image
                    className={styles.modelIcon}
                    src={model === item.value && (switchA || switchB) ? item.activeIcon : item.icon}
                  />
                  <Text
                    className={`${styles.modelLabel} ${
                      item.value === model && (switchA || switchB)
                        ? styles.modelLabelActive
                        : styles.modelLabel
                    }`}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <View className={styles.card}>
        {childLock && (switchA || switchB) && <View className={styles.lockMask} />}

        <View className={styles.gearSet}>
          <View className={styles.gearItem}>
            <View className={styles.gearLabel}>
              <Text className={styles.gearName}>{Strings.getLang('lightSet')}</Text>
            </View>
            <View className={styles.sceneLightList}>
              <View className={styles.sceneLightItem} onClick={handleChangeSwitchNightLight}>
                <Image
                  className={styles.modelIcon}
                  src={
                    switchNightLight && (switchA || switchB) ? Res.lightActiveIcon : Res.lightIcon
                  }
                />
                <Text
                  className={`${styles.modelLabel} ${
                    switchNightLight && (switchA || switchB) ? styles.modelLabelActive : ''
                  }`}
                >
                  {Strings.getLang('nightLight')}
                </Text>
              </View>
              <View className={styles.modelLine} />
              <View className={styles.sceneLightItem} onClick={handleChangeLight}>
                <Image
                  className={styles.modelIcon}
                  src={light && (switchA || switchB) ? Res.screenActiveIcon : Res.screenIcon}
                />
                <Text
                  className={`${styles.modelLabel} ${
                    light && (switchA || switchB) ? styles.modelLabelActive : styles.modelLabel
                  }`}
                >
                  {Strings.getLang('offScreen')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className={styles.card}>
        <View className={styles.childLock}>
          <Image
            className={styles.lockIcon}
            src={switchA || switchB ? Res.lockActiveIcon : Res.lockIcon}
          />
          <View className={styles.remind}>
            <Text className={styles.label}>{Strings.getLang('childLock')}</Text>
            <Text className={styles.des}> {Strings.getLang('childLockRemind')} </Text>
          </View>
          <Switch
            disabled={!switchA && !switchB}
            checked={childLock && (switchA || switchB)}
            color="#FE8630"
            onChange={handleChangeChildLock}
          />
        </View>
      </View>
      {showError && <ErrorPopup fault={fault} />}
      {showModel && (
        <ModelPopup
          model={selectModel}
          onConfirm={confirmChumanModel}
          onCancel={cancelChumanModel}
        />
      )}
    </View>
  );
}

export default Home;
