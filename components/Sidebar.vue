<template>
    <div class="sidebar">
        <ul>
            <h1>Filters</h1>
            <li>Text 1</li>
            <li>Text 1</li>
            <li>Text 1</li>
            <li>Text 1</li>
            <li>Text 1</li>
        </ul>
    </div>
</template>

<style>
.sidebar ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
}

.sidebar ul h1{
    font-size: 20px;
    /* color: var(--primary-color); */
    text-align: center;
    margin: 20px 0px;
}

.sidebar ul li {
    text-align: center;
    padding: 10px 30px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.125);
    cursor: pointer;
}
</style>