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


    /*
     *  TODO: This has the default starting media
     *  Add a query to get the user's created media and put it inside this useState 
     */
  
    // I need to converts tags to string to avoid some errors
    // queryResult.map((element) => (
    //     element.tags = element.tags.join(" ")
    // ))

    const [mediaList, setMediaList] = useState([
      {
        name: "Hero Academy",
        summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
        tags: "anime tv",
        recReview: "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
        recRating: 6.9,
        comRating: 4.2,
        category: "Current",
        showID: 0
      },
      {
        name: "Hero Academy",
        summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
        tags: "anime tv",
        recReview: "",
        recRating: 10,
        comRating: 5,
        category: "Next",
        showID: 1
      },
      {
        name: "Your Mom",
        summary: "What would the world be like if 80 percent of the population manifested extraordinary superpowers called “Quirks” at age four? Heroes and villains would be battling it out everywhere! Becoming a hero would mean learning to use your power, but where would you go to study? U.A. High's Hero Program of course! But what would you do if you were one of the 20 percent who were born Quirkless?",
        tags: "anime tv",
        recReview: "Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasn't got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all gives him a chance to change his destiny…",
        recRating: 3.5,
        comRating: 2.8,
        category: "Planning",
        showID: 2
      }
    ]);

    // TODO add query write here
    const addNewMedia = (values, category) => {
      let newMedia = {
        name: values.name,
        summary: values.summary,
        tags: values.tags,
        recReview: values.recReview,
        recRating: values.recRating,
        comRating: values.comRating,
        category: category,
        showID: 3 //TODO add this Ninad
      }

      //TODO for the query, convert the tags to an array by doing
      // arrayTags = [values.tags]

    //   INSERT INTO RECOMMENDATION (show_id, title, description, email, recommender_rating, community_rating, recommender_review, category, tags) 
    // VALUES ({show_id}, {values.name},{values.summary}, {email},{values.recRating},{values.comRating},{values.recReview},{category},{arrayTags});

      setMediaList([...mediaList, newMedia])
    }

    const updateMedia = (values, category, showID) => {
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

      setMediaList((prevMediaList) =>
        prevMediaList.map((media) => {
          return media.showID === newMedia.showID ? newMedia : media;
        }),
      );
    }

    const deleteMedia = (showID) => {
      //query DELETE from RECOMMENDATION WHERE show_id={showID};
      setMediaList(mediaList.filter(item => item.showID !== showID))
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

			<FormDialog addNewMedia={addNewMedia} />
		</>
	);
}

export default WatchList
