import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { FC } from "react";
import { ISchedule, WeekDay } from "../utils/schedule";

export interface ScheduleSettingsProps {
  schedule?: ISchedule;
  onChangeDay?: (day: WeekDay, value: boolean) => void;
}

export const ScheduleSettings: FC<ScheduleSettingsProps> = ({
  schedule,
  onChangeDay,
}) => {
  const handleChange = (day: WeekDay) => (e: any) => {
    onChangeDay!(day, e.target.checked);
  };

  return schedule ? (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.monday} />}
        label="Monday"
        onChange={handleChange(WeekDay.monday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.tuesday} />}
        label="Tuesday"
        onChange={handleChange(WeekDay.tuesday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.wedenesday} />}
        label="Wednesday"
        onChange={handleChange(WeekDay.wedenesday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.thursday} />}
        label="Thursday"
        onChange={handleChange(WeekDay.thursday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.friday} />}
        label="Friday"
        onChange={handleChange(WeekDay.friday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.saturday} />}
        label="Saturday"
        onChange={handleChange(WeekDay.saturday)}
      />
      <FormControlLabel
        control={<Switch defaultChecked={schedule?.sunday} />}
        label="Sunday"
        onChange={handleChange(WeekDay.sunday)}
      />
    </FormGroup>
  ) : (
    <></>
  );
};
