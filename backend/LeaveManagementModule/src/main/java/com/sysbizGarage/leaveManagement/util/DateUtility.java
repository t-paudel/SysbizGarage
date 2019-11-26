package com.sysbizGarage.leaveManagement.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;

public class DateUtility 
{
	String pattern1 = "dd-MMMMM-yyyy";
	String pattern2 = "yyyy-MM-dd";

	SimpleDateFormat sdf1 = new SimpleDateFormat(pattern1);
	SimpleDateFormat sdf2 = new SimpleDateFormat(pattern2);

	public String formatDate(String date)
	{
		System.out.println("DateUtility : formatDate()");

		String d = null;
		try 
		{
			d = sdf1.format(sdf2.parse(date));
		} 
		catch (ParseException e) 
		{
			e.printStackTrace();
		}
		
		return d;
	}

	public int differenceInDays(Date startDate, Date endDate)
	{
		System.out.println("DateUtility : differenceInDays()");

		LocalDate start=null,end=null;
		int diff;

		start = LocalDate.parse(sdf2.format(startDate));
		end = LocalDate.parse(sdf2.format(endDate));
		
		diff = (int) ChronoUnit.DAYS.between(start,end);
		diff = diff + 1; //to include both start and end date.
		System.out.println("Difference in date = " + diff);
		return diff;
	}

	public int numberOfBusinessDays(Date startDate, Date endDate)
	{
		System.out.println("DateUtility : numberOfBusinessDays()");

		int workDay = 0;
		Calendar startCal, endCal;

		startCal = Calendar.getInstance();
		endCal = Calendar.getInstance();

		startCal.setTime(startDate);
		endCal.setTime(endDate);
		
		do
		{
			startCal.add(Calendar.DAY_OF_MONTH, 1);
			if(startCal.get(Calendar.DAY_OF_WEEK) != Calendar.SATURDAY   &&    Calendar.DAY_OF_WEEK != Calendar.SUNDAY)
				workDay++;
		}while (startCal.getTimeInMillis() < endCal.getTimeInMillis());
		
		workDay++;	//to include both the dates
		System.out.println("no. of business days = " + workDay);

		return workDay;
	}
}
