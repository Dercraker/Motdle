"use client";

import { Text } from "@mantine/core";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

interface TimeLeftProps {
  label: string;
  momentToLeft: Moment;
}

interface TimeLeftState {
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeLeftBefore = ({ label, momentToLeft }: TimeLeftProps) => {
  const calculateTimeLeft = () => {
    const difference = momentToLeft.diff(moment().utc(true));
    const duration = moment.duration(difference);

    let timeLeft = {};

    timeLeft = {
      hours: Math.floor(duration.asHours()),
      minutes: Math.floor(duration.asMinutes() % 60),
      seconds: Math.floor(duration.asSeconds() % 60),
    };

    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Mise à jour toutes les secondes

    return () => clearInterval(timer);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  return (
    <Text>
      {label}{" "}
      {(timeLeft as TimeLeftState).hours > 0 &&
        (timeLeft as TimeLeftState).hours + "h"}{" "}
      {(timeLeft as TimeLeftState).minutes > 0 &&
        (timeLeft as TimeLeftState).minutes + "m"}{" "}
      {(timeLeft as TimeLeftState).seconds > 0 &&
        (timeLeft as TimeLeftState).seconds + "s"}
    </Text>
  );
};

export default TimeLeftBefore;
