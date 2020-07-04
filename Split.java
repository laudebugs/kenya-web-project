import java.io.File;
import java.io.FileWriter;   // Import the FileWriter class
import java.io.IOException;
import java.util.Scanner;
public class Split{
    public static void main (String[]args){
        try {
            File fileIn = new File("websites.txt");
            Scanner sc = new Scanner(fileIn);

            //The output file
            File fileOut = new File("");
            
            FileWriter myWriter = new FileWriter("websiteData.csv");
            int i=1;
            while (sc.hasNextLine()){
                myWriter.write(sc.nextLine());
                if(i<6) myWriter.write(",");
                if(i==6){
                    myWriter.write("\n");
                    i=0;
                }
                i++;
            }
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
        } catch (Exception e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}