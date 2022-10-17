import { CalendarMonth } from "@mui/icons-material";
import { Divider, Typography as Text } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ScheduleSettings } from "../../../components/ScheduleSettings";
import { Screen } from "../../../components/Screen";
import { ScreenTitle } from "../../../components/ScreenTitle";
import { useFirebase } from "../../../providers/FirebaseProvider";
import { ISchedule, WeekDay } from "../../../utils/schedule";

export const ScheduleScreen: FC = () => {
  const { schedule: scheduleApi } = useFirebase();
  const [schedule, setSchedule] = useState<{ value: ISchedule }>();

  useEffect(() => {
    scheduleApi.get().then((result) => setSchedule({ value: result }));
  }, [scheduleApi]);

  const updateScheduleProp = async (day: WeekDay, value: boolean) => {
    await scheduleApi.setProperty(day, value);
  };

  return (
    <Screen role="schedule" sx={{ gap: 2 }}>
      <ScreenTitle text="Schedule" Icon={CalendarMonth} />
      <Text variant="caption">
        You can control here what days of the week is the food run available.
      </Text>
      <Divider />
      <ScheduleSettings
        schedule={schedule?.value}
        onChangeDay={updateScheduleProp}
      />
    </Screen>
  );
};
