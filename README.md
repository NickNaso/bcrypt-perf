# Bcrypt for Node.js

## Performance estimation between NAN and N-API implementation

Recently I worked on the porting of bcrypt for Node.js to the new **N-API** and 
now I created this repository to do some experiments to estimate the performance
against the previous version impelented with **NAN**.

## Environment

- Node.js Version **8.9.3**

- OS **macOS** - High Sierra (10.13.2)

- **MacBook Pro** (13-inch, 2016, Four Thunderbolt 3 Ports)

- CPU **2,9 GHz** Intel Core i5

- Memory **16 GB** 2133 MHz LPDDR3

## Experiments

I created two main experiments one where I used bcrypt to hash a password with 
```salt round``` parameter set to **10** and **11**, and another where I used 
bcrypt to compare password. Obviously I executed this for both synchronous and 
asynchronous api that bcrypt expose. Eacher task was repeated 1000 times and than
I considered as result to compare the NAN and N-API version the avarage of the 
time execution.  

## Results

### Hash password **using synchronous** api and **salt round** set to **10** 

In average the N-API version of the addon is **1.74**% faster than NAN version

### Hash password **using synchronous** api and **salt round** set to **11** 

In average the N-API version of the addon is 1.74% faster than NAN version

### Hash password **using asynchronous** api and **salt round** set to **10** 

In average the N-API version of the addon is 1.74% faster than NAN version

### Hash password **using asynchronous** api and **salt round** set to **11** 

In average the N-API version of the addon is 1.74% faster than NAN version

## The Team

### Nicola Del Gobbo

<https://github.com/NickNaso/>

<https://www.npmjs.com/~nicknaso>

<https://twitter.com/NickNaso>

## Acknowledgements

Thank you to all people that encourage me every day.

## License

Licensed under [Apache license V2](./LICENSE)