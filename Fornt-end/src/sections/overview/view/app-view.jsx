import { faker } from '@faker-js/faker';
import React, {  useState , useEffect} from "react";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';


// ----------------------------------------------------------------------



export default function AppView() {

 const [newBlogs, setNewBlogs] = useState([])
  useEffect(() => {
      fetch("http://localhost:1337/api/blogs?populate=*", {
      headers: {
        'Content-type': 'application/json',
  
      },
    })
      .then((res) =>res.json())
      .then((data) => {
        console.log("data",data.data);
        setNewBlogs(data.data)
        console.log("newBlogs",newBlogs);
      })
  
  }, [])


console.log("kgar",newBlogs)

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
       مدیریت خود را آغاز کنید👋
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid> */}

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="کاربران"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="دارایی ها"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <AppWidgetSummary
            title="اماکن"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="گزارش عملیات پنل"
            subheader="(+43%) در یک سال گذشته"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'کاربران جدید',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'اموال جدید',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'مکان جدید',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
{/* 
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid> */}
{/* 
        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={12} lg={12}>
          <AppNewsUpdate
            title="جدید ترین مقالات"
            list={newBlogs.map((blog, index) => ({
              id: blog.id,
              title:blog.attributes.bName,
              description:blog.attributes.bDesc,
              image:"http://localhost:1337"+blog.attributes.bImg.data.attributes.url,
              postedAt:blog.attributes.bDate,
            }))}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={5}>
          <AppTrafficBySite
            title="شبکه های اجتماعی "
            subheader="با دنبال کردن شبکه های اجتماعی ما از آخرین تغییرات پنل باخبر شوید"
            list={[
              {
                name: 'FaceBook',
              
                value:"https://pardis.facebook.com",
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: "pardis@gmail.com",
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: "www.linkedin.com/in/pardis",
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: "@pardis",
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={7} sx={{height:"100%"}}>
          <AppTasks
            title="کارهای امروز"
            list={[
              { id: '1', name: 'اضافه کردن کاربران جدید' },
              { id: '2', name: 'حذف اموال قدیمی' },
              { id: '3', name: 'خواندن مقالات جدید' },
              { id: '4', name: 'اتمام ویرایش کابران' },
              { id: '5', name: 'ویرایش آواتار' },
              { id: '6', name: 'چک کردن شبکه های مجازی' },
            
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
