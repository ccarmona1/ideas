import { addZeroAtTheBeginning } from './addZeroAtTheBeginning';

export const getCourseDuration = (duration) => {
	const hours = duration / 60;
	const mappedHours = Math.floor(hours);
	const minutes = (hours - mappedHours) * 60;
	const mappedMinutes = Math.round(minutes);

	return `${addZeroAtTheBeginning(mappedHours)}:${addZeroAtTheBeginning(
		mappedMinutes
	)} ${mappedHours === 1 ? 'hour' : 'hours'}`;
};
