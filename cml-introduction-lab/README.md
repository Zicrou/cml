
## Initial directory setup

1. Create directory called **CML Introduction**

```
mkdir CML
```

2. Clone cml-introduction-lab project inside cml directory


```
git@github.com:simple-deploy/cml-introduction-lab.git
```

3. Clone cml-introduction-webapp in same directory

```
git@github.com:simple-deploy/cml-introduction-webapp.git
```

4. Clone cml-introduction-backend in same directory

```
git@github.com:simple-deploy/cml-introduction-backend.git

```

## Running lab

Now assuming you are in **cml-introduction-lab** directory

1. Build images of all services

```
make build
```

2. Setup database in **backend** service

```
make setup-db
```

3. Run all services

```
make start
```

4. Now open local app (http://localhost:9002) for backend

    and for  webapp (http://localhost:9000) For Admin portal  (http://localhost:9001)
