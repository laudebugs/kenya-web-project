package scripts;

import java.io.File;
import java.io.FileWriter; // Import the FileWriter class
import java.util.Scanner;

public class Split {
    public static void main(String[] args) {
        try {
            File fileIn = new File("data/rawWebsiteData.txt");
            Scanner sc = new Scanner(fileIn);

            FileWriter myWriter = new FileWriter("data/websiteData.json");
            int i = 1;
            String info = "";
            myWriter.write("[\n");
            while (sc.hasNextLine()) {
                switch (i) {
                    case 1:
                        info += "{\"rank\":\"" + sc.nextLine() + "\",";
                        break;
                    case 2:
                        info += "\"site\":\"" + sc.nextLine() + "\",";
                        break;
                    case 3:
                        info += "\"daily time on site\":\"" + sc.nextLine() + "\",";
                        break;
                    case 4:
                        info += "\"daily pageviews per visitor\":\"" + sc.nextLine() + "\",";
                        break;
                    case 5:
                        info += "\"% of Traffic From Search\":\"" + sc.nextLine() + "\",";
                        break;
                    case 6:
                        info += "\"total Sites Linking In\":\"" + sc.nextLine() + "\"},";
                        break;
                }

                if (i >= 6) {
                    myWriter.write(info + "\n");
                    info = "";
                    i = 0;
                }
                i++;

            }
            myWriter.write("\n]");
            myWriter.close();
            System.out.println("Successfully wrote to the file.");
            sc.close();
        } catch (Exception e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}