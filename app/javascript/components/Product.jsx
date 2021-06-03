import React,{ useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import axios from 'axios';
import countryList from 'react-select-country-list'
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles((theme) =>({
    root: {

        flexGrow: 1,
        color: green[400],
        '&$checked': {
            color: green[600],
        },
        margin: {
            margin: theme.spacing(1),
        },
    },
    pcard: {
        maxWidth: 345,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

export default function ImgMediaCard() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterSuppliers, setFilterSuppliers] = useState([]);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [supplier, setSupplier] = useState('');
    const [premium, setPremium] = useState('');
    const [title, setTitle] = useState('');
    const [sort, setSort] = useState('');
    const [price, setPrice] = useState([0, 100]);

    const handleChange = (event, value) => {
        setPage(value);
        getProducts();
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };
    const handleSupplierChange = (event) => {
        setSupplier(event.target.value);
    };
    const handlePremiumChange = (event) => {
        if(event.target.checked) {
            setPremium(true)
        }else{
            setPremium('')
        }

    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    };

    const handlePriceChange = (event, newValue) => {
        setPrice(newValue)
    };
    const handleSearch = (event) => {
        setPage(1);
        getProducts();
    };
    const handleSortChange = (event) => {
        setSort(event.target.value);
        getProducts();
    };


    useEffect(() => {
        getProducts();
    }, [])


    const options = useMemo(() => countryList().getData(), []);

    function pricetext(newprice) {
        return `USD ${newprice/100}`;
    }

    function getProducts() {
        axios.get('api/v1/products.json', {
            params: {
                category_name: category,
                supplier_name: supplier,
                title: title,
                page: page,
                premium: premium,
                sort: sort,
                shipping_exclusions: location,
                minprice: price[0],
                maxprice: price[1]
            }
        })
            .then(function (response) {
                console.log(response.data.products);
                setIsLoaded(true);
                setItems(response.data.products);
                setFilterCategories(response.data.filters.categories_hash);
                setFilterSuppliers(response.data.filters.suppliers_hash);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    return (

        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TextField id="outlined-basic" onChange={handleTitleChange} label="Outlined" variant="outlined" />
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={category}
                            onChange={handleCategoryChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {filterCategories.map(cat => (
                                <MenuItem value={cat.name}>{cat.name}</MenuItem>

                            ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Ships To</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={location}
                            onChange={handleLocationChange}
                            label="Location"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {options.map(loc => (
                                <MenuItem value={loc.label}>{loc.label}</MenuItem>

                            ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <Typography id="range-slider" gutterBottom>
                        Price range
                    </Typography>
                    <Slider
                        value={price}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={pricetext}
                        min={0}
                        max={100}
                    />
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Supplier</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={supplier}
                            onChange={handleSupplierChange}
                            label="Supplier"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {filterSuppliers.map(sup => (
                                <MenuItem value={sup.name}>{sup.name}</MenuItem>

                            ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControlLabel
                        control={<Checkbox checked={premium} onChange={handlePremiumChange} name="checkedA" />}
                        label="Premium"
                    />
                </Grid>

                <Grid item xs={1}>
                    <Button variant="contained" size="large" color="primary" onClick={handleSearch} className={classes.margin}>
                        Search
                    </Button>
                </Grid>

            </Grid>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={sort}
                    onChange={handleSortChange}
                    label="Location"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='price'>Price</MenuItem>
                    <MenuItem value='relevence'>Relevence</MenuItem>
                </Select>
            </FormControl>

            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
            <Grid container spacing={3}>
                {items && items.map(item => (
                    <Grid item xs={3}>
                        <Card className={classes.pcard}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={item.title}
                                    height="140"
                                    image={item.image_cover_url}
                                    title={item.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        By - {item.supplier_name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <div>
                                    <Button size="small" color="primary">
                                        Price(USD)<br/>
                                        {item.formatted_price}
                                    </Button>
                                </div>
                                <div>
                                    <Button size="small" color="primary">
                                        Retail Price(USD)<br/>
                                        {item.formatted_msrp}
                                    </Button>
                                </div>
                                { item.premium==true && <div>
                                    <Button size="small" color="primary">
                                        Premium
                                    </Button>
                                </div>}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>
    );
}