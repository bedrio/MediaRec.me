import {React, useState, useEffect} from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MediaCard from '../components/MediaCard';
import RecMediaCard from '../components/RecMediaCard';
import FormDialog from "../components/FormDialog";
import {useCookies} from "react-cookie";
import SettingsDialog from '../components/SettingsDialog';
import {v4 as uuidv4} from 'uuid';

function TabPanel(props) {
	const {children, value, index, ...other} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{p: 3}}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function WatchList() {
	const [tabNumber, setTabNumber] = useState(0);

	//TODO Ninad. Set the number of media with category curent and category next in the relevant useState
	const [currentNumber, setCurrentNumber] = useState(1);
	const [currentLimit, setCurrentLimit] = useState(3);
	const [nextNumber, setNextNumber] = useState(1);
	const [nextLimit, setNextLimit] = useState(5);
	const updateNumbers = (values) => {
		setCurrentLimit(values.currentLimit);
		setNextLimit(values.nextLimit);
	}

	const [cookies, setCookie] = useCookies();

	/*
	 *  TODO: This has the default starting media
	 *  Add a query to get the user's created media and put it inside this useState
	 */
	const [mediaList, setMediaList] = useState([
		// {
		// 	name: "Hero Academy",
		// 	summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
		// 	tags: "anime tv",
		// 	recReview: "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
		// 	recRating: 8,
		// 	comRating: 7,
		// 	category: "Current",
		// 	showID: 0
		// },
		// {
		// 	name: "Fullmetal Alchemist: Brotherhood",
		// 	summary: "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.",
		// 	tags: "anime tv",
		// 	recReview: "",
		// 	recRating: 10,
		// 	comRating: 9,
		// 	category: "Next",
		// 	showID: 1
		// },
		// {
		// 	name: "Your Name",
		// 	summary: "Mitsuha Miyamizu, a high school girl, yearns to live the life of a boy in the bustling city of Tokyo—a dream that stands in stark contrast to her present life in the countryside. Meanwhile in the city, Taki Tachibana lives a busy life as a high school student while juggling his part-time job and hopes for a future in architecture.",
		// 	tags: "anime tv",
		// 	recReview: "Very high quality animation. Pretty funny and has a nice romance",
		// 	recRating: 8,
		// 	comRating: 9,
		// 	category: "Planning",
		// 	showID: 2
		// }
	]);

	useEffect(async () => {
		const response = await fetch(`http://localhost:3001/media/${cookies.email}`, {
			method: "GET",
			headers: {"Content-Type": "application/json"}
		});

		const data = await response.json();

		if (data.length === 0) {
			// alert("No such user found. Try again!");
		} else {
			const tempCards = []
			for (let i = 0; i < data.length; i++) {
				tempCards.push({
					name: data[i].title,
					summary: data[i].description,
					tags: "",
					recReview: data[i].recommender_review,
					recRating: data[i].recommender_rating,
					comRating: data[i].community_rating,
					category: data[i].category,
					showID: data[i].show_id
				});
			}

			setMediaList(tempCards);
		}
	}, [])


	const addNewMedia = async (values, category) => {
		if (currentNumber == currentLimit || nextNumber == nextLimit) {
			alert("You can't add any more cards to this category. Either delete or move to a different category.")
			return
		}

		const randomNum = Math.random() * 10000;

		let newMedia = {
			name: values.name,
			summary: values.summary,
			tags: values.tags,
			recReview: values.recReview,
			recRating: values.recRating,
			comRating: values.comRating,
			category: category,
			showID: Math.floor(randomNum)
		}

		if (category === "Current") {
			setCurrentNumber(currentNumber + 1);
		} else if (category === "Next") {
			setNextNumber(nextNumber + 1);
		}

		// INSERT INTO RECOMMENDATION (show_id, title, description, email, recommender_rating, community_rating, recommender_review, category, tags)
		// VALUES ({show_id}, {values.name},{values.summary}, {email},{values.recRating},{values.comRating},{values.recReview},{category},{arrayTags});
		const response = await fetch(`http://localhost:3001/media/${cookies.email}`, {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newMedia)
		});

		const data = await response.json();

		if (data.name === "error") {
			alert(data.detail);
		} else {
			alert("Successfully Added!")
		}

		setMediaList([...mediaList, newMedia])
	}

	const updateMedia = async (values, category, showID) => {
		let newMedia = {
			name: values.name,
			summary: values.summary,
			tags: values.tags,
			recReview: values.recReview,
			recRating: values.recRating,
			comRating: values.comRating,
			category: category,
			showID: showID
		}

		//UPDATE RECOMMENDATION SET show_id={showID}, title={values.name}, description={values.summary}, recommender_rating={values.recRating}, community_rating={values.comRating}, recommender_review={values.recRating}, category={category}, tags={arrayTags} where email={userEmail};

		const response = await fetch(`http://localhost:3001/media/${showID}`, {
			method: "PUT",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newMedia)
		});

		const data = await response.json();

		if (data.name === "error") {
			alert(data.detail);
		} else {
			alert("Successfully Updated!")
		}

		setMediaList((prevMediaList) =>
			prevMediaList.map((media) => {
				return media.showID === newMedia.showID ? newMedia : media;
			}),
		);
	}

	const deleteMedia = async (showID, category) => {
		if (category === "Current") {
			setCurrentNumber(currentNumber - 1);
		} else if (category === "Next") {
			setNextNumber(nextNumber - 1);
		}

		//query DELETE from RECOMMENDATION WHERE show_id={showID};

		const response = await fetch(`http://localhost:3001/media/${showID}`, {
			method: "DELETE",
			headers: {"Content-Type": "application/json"}
		});

		const data = await response.json();

		if (data.name === "error") {
			alert(data.detail);
		} else {
			alert("Successfully Deleted!")
		}

		setMediaList(mediaList.filter(item => item.showID !== showID))
	}

	const updateTab = (event, newValue) => {
		setTabNumber(newValue);
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between">
				<Typography variant={"h1"} fontSize={"xxx-large"} fontWeight={700} color={"#CBE0F2"}>
					Media List
				</Typography>
				<SettingsDialog
					currentNumber={currentNumber}
					nextNumber={nextNumber}
					nextLimit={nextLimit}
					currentLimit={currentLimit}
					updateNumbers={updateNumbers}
				/>
			</Box>

			<Box sx={{width: '100%'}}>
				<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
					<Tabs value={tabNumber} onChange={updateTab} textColor="inherit" aria-label="basic tabs example"
					      variant="fullWidth">
						<Tab label="Current" sx={{color: "#CBE0F2"}}/>
						<Tab label="Next" sx={{color: "#CBE0F2"}}/>
						<Tab label="Planning" sx={{color: "#CBE0F2"}}/>
					</Tabs>
				</Box>
				<TabPanel value={tabNumber} index={0}>
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
				<TabPanel value={tabNumber} index={1}>
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
				<TabPanel value={tabNumber} index={2}>
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
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
											showID={media.showID}
											updateMedia={updateMedia}
											deleteMedia={deleteMedia}
										/>
									}
								</Box>
								: null}
						</>
					}) : null}
				</TabPanel>
			</Box>

			<FormDialog
				addNewMedia={addNewMedia}
				currentNumber={currentNumber}
				currentLimit={currentLimit}
				nextNumber={nextNumber}
				nextLimit={nextLimit}
			/>
		</>
	);
}

export default WatchList