import { React, useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MediaCard from '../components/MediaCard';
import RecMediaCard from '../components/RecMediaCard';
import FormDialog from "../components/FormDialog";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function WatchList() {
	const [cookies, setCookie] = useCookies(["email", "name"]);
	const navigate = useNavigate();

	useEffect(() => {
		if (cookies.email == null)
			navigate('auth')
	}, [])

	const [value, setValue] = useState(0);

	/*
	 *  TODO: This has the default starting media
	 *  Add a query to get the user's created media and put it inside this useState 
	 */
	const [mediaList, setMediaList] = useState([
		{
			name: "Hero Academy",
			summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
			tags: ["anime", "tv", "show"],
			recReview: "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
			recRating: 6.9,
			comRating: 4.2,
			category: "Current"
		},
		{
			name: "Hero Academy",
			summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
			tags: ["anime", "tv", "show"],
			recReview: "",
			recRating: 10,
			comRating: 5,
			category: "Next"
		},
		{
			name: "Your Mom",
			summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
			tags: ["anime", "tv", "show"],
			recReview: "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
			recRating: 3.5,
			comRating: 2.8,
			category: "Planning"
		}
	]);

	// TODO add query write here
	const addNewMedia = (values, category) => {
		let newMedia = {
			name: values.name,
			summary: values.summary,
			tags: values.tags.split(),
			recReview: values.recReview,
			recRating: values.recRating,
			comRating: values.comRating,
			category: category
		}

		setMediaList([...mediaList, newMedia])
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<Box>
				<h1>Media List</h1>
				{/* settings icon */}
			</Box>

			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} textColor="inherit" aria-label="basic tabs example" variant="fullWidth">
						<Tab label="Current" />
						<Tab label="Next" />
						<Tab label="Planning" />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					{/* What this basically does is: if medialist exists, then map every media that has the category current */}
					{mediaList ? mediaList.map((media) => {
						return <>
							{media.category === "Current" ?
								<Box marginBottom="25px">
									{/* if recReview is an empty string, then it will choose a normal mediaCard, otherwise, it chooses a recMediaCard */}
									{media.recReview === "" ?
										<MediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											comRating={media.comRating}
											category={media.category}
										/>
										:
										<RecMediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											recReview={media.recReview}
											recRating={media.recRating}
											comRating={media.comRating}
											category={media.category}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
				<TabPanel value={value} index={1}>
					{mediaList ? mediaList.map((media) => {
						return <>
							{media.category === "Next" ?
								<Box marginBottom="25px">
									{media.recReview === "" ?
										<MediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											comRating={media.comRating}
											category={media.category}
										/>
										:
										<RecMediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											recReview={media.recReview}
											recRating={media.recRating}
											comRating={media.comRating}
											category={media.category}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
				<TabPanel value={value} index={2}>
					{mediaList ? mediaList.map((media) => {
						return <>
							{media.category === "Planning" ?
								<Box marginBottom="25px">
									{media.recReview === "" ?
										<MediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											comRating={media.comRating}
											category={media.category}
										/>
										:
										<RecMediaCard
											name={media.name}
											summary={media.summary}
											tags={media.tags}
											recReview={media.recReview}
											recRating={media.recRating}
											comRating={media.comRating}
											category={media.category}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
			</Box>

			<FormDialog addNewMedia={addNewMedia} />
		</>
	);
}

export default WatchList
